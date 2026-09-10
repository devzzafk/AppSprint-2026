import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { supabase } from "../../lib/supabase";
import {
    calculateMatch,
    Demand,
    Product,
} from "../../services/matching";

type Match = {
  product: Product;
  demand: Demand;
  score: number;
  productScore: number;
  quantityScore: number;
  locationScore: number;
  priceScore: number;
  availabilityScore: number;
};

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const { data: demands, error: demandError } =
        await supabase
          .from("demands")
          .select("*")
          .eq("buyer_id", user.id)
          .eq("status", "active");

      if (demandError) throw demandError;

      const { data: products, error: productError } =
        await supabase
          .from("products")
          .select("*")
          .eq("status", "active");

      if (productError) throw productError;

      const calculatedMatches: Match[] = [];

      for (const demand of demands || []) {
        for (const product of products || []) {
          const result = calculateMatch(
            product as Product,
            demand as Demand
          );

          // Don't show completely irrelevant products.
          if (result.score >= 50) {
            calculatedMatches.push({
              product: product as Product,
              demand: demand as Demand,
              ...result,
            });
          }
        }
      }

      calculatedMatches.sort(
        (a, b) => b.score - a.score
      );

      setMatches(calculatedMatches);
    } catch (error) {
      console.error("Match loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  function renderMatch({ item }: { item: Match }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/dashboard/match-details",
            params: {
              score: item.score.toString(),
              productName: item.product.name,
              quantity: item.product.quantity.toString(),
              unit: item.product.unit,
              price:
                item.product.expected_price?.toString() || "",
              city: item.product.city || "",
              district: item.product.district || "",
              productScore:
                item.productScore.toString(),
              quantityScore:
                item.quantityScore.toString(),
              locationScore:
                item.locationScore.toString(),
              priceScore:
                item.priceScore.toString(),
              availabilityScore:
                item.availabilityScore.toString(),
              demandId: item.demand.id,
              productId: item.product.id,
              producerId: item.product.producer_id,
            },
          })
        }
      >
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.productName}>
              {item.product.name}
            </Text>

            <Text style={styles.location}>
              {item.product.city ||
                item.product.district ||
                "Location unavailable"}
            </Text>
          </View>

          <View style={styles.scoreCircle}>
            <Text style={styles.score}>
              {item.score}%
            </Text>
            <Text style={styles.matchLabel}>
              MATCH
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>
              Available
            </Text>
            <Text style={styles.infoValue}>
              {item.product.quantity} {item.product.unit}
            </Text>
          </View>

          <View>
            <Text style={styles.infoLabel}>
              Expected price
            </Text>
            <Text style={styles.infoValue}>
              {item.product.expected_price
                ? `₹${item.product.expected_price}/${item.product.unit}`
                : "Negotiable"}
            </Text>
          </View>
        </View>

        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>
            Why this matches
          </Text>

          <View style={styles.breakdownRow}>
            <Text>Product</Text>
            <Text>{item.productScore}%</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text>Quantity</Text>
            <Text>{item.quantityScore}%</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text>Location</Text>
            <Text>{item.locationScore}%</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text>Price</Text>
            <Text>{item.priceScore}%</Text>
          </View>
        </View>

        <Text style={styles.viewText}>
          View producer →
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>
          LINKHARVEST
        </Text>

        <Text style={styles.title}>
          Harvest Match
        </Text>

        <Text style={styles.subtitle}>
          Producers ranked by how well they match
          your demand.
        </Text>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>
            Finding the right producers...
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item, index) =>
            `${item.product.id}-${item.demand.id}-${index}`
          }
          renderItem={renderMatch}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No strong matches yet
              </Text>

              <Text style={styles.emptyText}>
                Once producers add suitable supply,
                their listings will appear here.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F4",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 22,
  },

  back: {
    color: "#4E5E49",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#687363",
    marginBottom: 7,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#182018",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#747B72",
    marginTop: 7,
  },

  list: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E3E7DF",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#202820",
  },

  location: {
    fontSize: 13,
    color: "#7B8278",
    marginTop: 4,
  },

  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5EEE1",
    alignItems: "center",
    justifyContent: "center",
  },

  score: {
    fontSize: 18,
    fontWeight: "900",
    color: "#385035",
  },

  matchLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#657360",
    marginTop: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF0EA",
    marginVertical: 16,
  },

  infoRow: {
    flexDirection: "row",
    gap: 45,
  },

  infoLabel: {
    fontSize: 11,
    color: "#858C83",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#394339",
  },

  breakdown: {
    backgroundColor: "#F7F9F5",
    borderRadius: 13,
    padding: 12,
    marginTop: 16,
  },

  breakdownTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#414B40",
    marginBottom: 8,
  },

  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  breakdownRowText: {
    fontSize: 12,
  },

  viewText: {
    textAlign: "right",
    marginTop: 14,
    fontSize: 13,
    fontWeight: "700",
    color: "#4D6348",
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#737A70",
  },

  empty: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 70,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#303830",
  },

  emptyText: {
    textAlign: "center",
    color: "#7A8178",
    lineHeight: 21,
    marginTop: 8,
  },
});