import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Product = {
  id: string;
  name: string;
  category: string | null;
  quantity: number;
  unit: string;
  expected_price: number | null;
  status: string;
};

export default function ProducerDashboard() {
  const [name, setName] = useState("Producer");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (profile?.name) {
        setName(profile.name);
      }

      const { data: productData, error } = await supabase
        .from("products")
        .select(
          "id, name, category, quantity, unit, expected_price, status"
        )
        .eq("producer_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (!error && productData) {
        setProducts(productData);
      }
    } catch (error) {
      console.log("Dashboard error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboard();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>PRODUCER</Text>
            <Text style={styles.greeting}>Hi, {name} 👋</Text>
            <Text style={styles.subtitle}>
              Find opportunities for what you produce.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.profileText}>P</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.opportunityCard}>
          <View style={styles.opportunityIcon}>
            <Text style={styles.iconText}>✦</Text>
          </View>

          <View style={styles.opportunityContent}>
            <Text style={styles.opportunityTitle}>
              What Can I Sell?
            </Text>

            <Text style={styles.opportunityDescription}>
              Discover buyer demands that match your products.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/dashboard/opportunities")}
            >
              <Text style={styles.opportunityLink}>
                Explore opportunities →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>My inventory</Text>
            <Text style={styles.sectionSubtitle}>
              Products currently available
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/inventory/add")}
          >
            <Text style={styles.addText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : products.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🌱</Text>

            <Text style={styles.emptyTitle}>
              Your inventory is empty
            </Text>

            <Text style={styles.emptyText}>
              Add your first product and let buyers find you.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/inventory/add")}
            >
              <Text style={styles.primaryButtonText}>
                Add your first product
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productTop}>
                <View style={styles.productIcon}>
                  <Text>🌿</Text>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {product.name}
                  </Text>

                  {product.category && (
                    <Text style={styles.productCategory}>
                      {product.category}
                    </Text>
                  )}
                </View>

                <View style={styles.activeBadge}>
                  <Text style={styles.activeText}>Active</Text>
                </View>
              </View>

              <View style={styles.productDetails}>
                <View>
                  <Text style={styles.detailLabel}>Available</Text>
                  <Text style={styles.detailValue}>
                    {product.quantity} {product.unit}
                  </Text>
                </View>

                <View>
                  <Text style={styles.detailLabel}>Expected price</Text>
                  <Text style={styles.detailValue}>
                    {product.expected_price
                      ? `₹${product.expected_price}/${product.unit}`
                      : "Not set"}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#718071",
    marginBottom: 7,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172117",
  },

  subtitle: {
    fontSize: 14,
    color: "#687168",
    marginTop: 7,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#365B3A",
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 17,
  },

  opportunityCard: {
    marginHorizontal: 22,
    backgroundColor: "#E7EFE2",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
  },

  opportunityIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    fontSize: 22,
    color: "#365B3A",
  },

  opportunityContent: {
    flex: 1,
    marginLeft: 14,
  },

  opportunityTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#203321",
  },

  opportunityDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#647064",
    marginTop: 5,
  },

  opportunityLink: {
    fontSize: 13,
    fontWeight: "800",
    color: "#365B3A",
    marginTop: 10,
  },

  sectionHeader: {
    paddingHorizontal: 22,
    marginTop: 30,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172117",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#7A827A",
    marginTop: 4,
  },

  addText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#365B3A",
  },

  loading: {
    paddingVertical: 50,
  },

  emptyCard: {
    marginHorizontal: 22,
    padding: 28,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E6DE",
  },

  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#263026",
  },

  emptyText: {
    fontSize: 13,
    color: "#747C74",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
    maxWidth: 280,
  },

  primaryButton: {
    backgroundColor: "#365B3A",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 13,
    marginTop: 18,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  productCard: {
    marginHorizontal: 22,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E2E6DE",
  },

  productTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  productIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#EEF3EA",
    alignItems: "center",
    justifyContent: "center",
  },

  productInfo: {
    flex: 1,
    marginLeft: 12,
  },

  productName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#202920",
  },

  productCategory: {
    fontSize: 12,
    color: "#7A827A",
    marginTop: 3,
  },

  activeBadge: {
    backgroundColor: "#E8F2E7",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  activeText: {
    color: "#426B45",
    fontSize: 11,
    fontWeight: "800",
  },

  productDetails: {
    flexDirection: "row",
    gap: 45,
    marginTop: 17,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#EEF0EC",
  },

  detailLabel: {
    fontSize: 11,
    color: "#8A918A",
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#283128",
  },

  logoutButton: {
    alignItems: "center",
    marginTop: 35,
  },

  logoutText: {
    color: "#8A5A5A",
    fontSize: 14,
    fontWeight: "700",
  },
});