import { router, useLocalSearchParams } from "expo-router";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function MatchDetails() {
  const params = useLocalSearchParams<{
    score: string;
    productName: string;
    quantity: string;
    unit: string;
    price: string;
    city: string;
    district: string;

    productScore: string;
    quantityScore: string;
    locationScore: string;
    priceScore: string;
    availabilityScore: string;

    demandId: string;
    productId: string;
    producerId: string;
  }>();

  async function connectWithProducer() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const { data: existing } = await supabase
      .from("connections")
      .select("id")
      .eq("buyer_id", user.id)
      .eq("producer_id", params.producerId)
      .eq("demand_id", params.demandId)
      .eq("product_id", params.productId)
      .maybeSingle();

    if (existing) {
      Alert.alert(
        "Already connected",
        "You've already sent an interest request for this producer."
      );
      return;
    }

    const { error } = await supabase
      .from("connections")
      .insert({
        buyer_id: user.id,
        producer_id: params.producerId,
        demand_id: params.demandId,
        product_id: params.productId,
        status: "pending",
      });

    if (error) {
      Alert.alert(
        "Couldn't connect",
        error.message
      );
      return;
    }

    Alert.alert(
      "Interest sent",
      "The producer can now respond to your request.",
      [
        {
          text: "Done",
          onPress: () => router.back(),
        },
      ]
    );
  }

  function ScoreRow({
    label,
    score,
  }: {
    label: string;
    score: string;
  }) {
    return (
      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>{label}</Text>

        <View style={styles.scoreRight}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progress,
                {
                  width: `${Math.min(
                    100,
                    Number(score)
                  )}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.scoreValue}>
            {score}%
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>
          HARVEST MATCH
        </Text>

        <View style={styles.hero}>
          <Text style={styles.productName}>
            {params.productName}
          </Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.score}>
              {params.score}%
            </Text>

            <Text style={styles.match}>
              MATCH
            </Text>
          </View>
        </View>

        <Text style={styles.location}>
          {params.city ||
            params.district ||
            "Location unavailable"}
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Available supply
            </Text>

            <Text style={styles.infoValue}>
              {params.quantity} {params.unit}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Expected price
            </Text>

            <Text style={styles.infoValue}>
              {params.price
                ? `₹${params.price}/${params.unit}`
                : "Negotiable"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Why this is a {params.score}% match
          </Text>

          <Text style={styles.sectionSubtitle}>
            LinkHarvest calculates the score using
            transparent matching factors.
          </Text>

          <View style={styles.breakdown}>
            <ScoreRow
              label="Product compatibility"
              score={params.productScore}
            />

            <ScoreRow
              label="Quantity compatibility"
              score={params.quantityScore}
            />

            <ScoreRow
              label="Location"
              score={params.locationScore}
            />

            <ScoreRow
              label="Price"
              score={params.priceScore}
            />

            <ScoreRow
              label="Availability"
              score={params.availabilityScore}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.connectButton}
          onPress={connectWithProducer}
        >
          <Text style={styles.connectText}>
            Express Interest
          </Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          The producer will receive your interest
          request and can choose to connect.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F4",
  },

  content: {
    padding: 24,
    paddingTop: 55,
    paddingBottom: 45,
  },

  back: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4E5E49",
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#687363",
    marginBottom: 12,
  },

  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productName: {
    flex: 1,
    fontSize: 32,
    fontWeight: "900",
    color: "#182018",
  },

  scoreCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#E5EEE1",
    alignItems: "center",
    justifyContent: "center",
  },

  score: {
    fontSize: 22,
    fontWeight: "900",
    color: "#385035",
  },

  match: {
    fontSize: 8,
    fontWeight: "800",
    color: "#657360",
    marginTop: 2,
  },

  location: {
    fontSize: 14,
    color: "#737A70",
    marginTop: 8,
  },

  infoGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E3E7DF",
  },

  infoLabel: {
    fontSize: 11,
    color: "#858C83",
    marginBottom: 7,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#303A30",
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#202820",
  },

  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#777E75",
    marginTop: 6,
  },

  breakdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E3E7DF",
  },

  scoreRow: {
    marginBottom: 18,
  },

  scoreLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4A5248",
    marginBottom: 8,
  },

  scoreRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  progressBackground: {
    flex: 1,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#E9ECE6",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#647A5C",
  },

  scoreValue: {
    width: 38,
    fontSize: 12,
    fontWeight: "800",
    color: "#455340",
    textAlign: "right",
  },

  connectButton: {
    backgroundColor: "#243524",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 30,
  },

  connectText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  bottomText: {
    textAlign: "center",
    color: "#858B82",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
    paddingHorizontal: 15,
  },
});