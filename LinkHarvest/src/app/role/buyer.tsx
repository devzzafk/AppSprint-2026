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

type Demand = {
  id: string;
  product_name: string;
  required_quantity: number;
  unit: string;
  min_price: number | null;
  max_price: number | null;
  required_by: string | null;
  status: string;
};

export default function BuyerDashboard() {
  const [name, setName] = useState("Buyer");
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

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

    const { data } = await supabase
      .from("demands")
      .select(
        "id, product_name, required_quantity, unit, min_price, max_price, required_by, status"
      )
      .eq("buyer_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    setDemands(data || []);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>LINKHARVEST</Text>
          <Text style={styles.title}>Hello, {name}</Text>
          <Text style={styles.subtitle}>
            What do you need today?
          </Text>
        </View>

        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/demand/add")}
      >
        <Text style={styles.primaryButtonText}>+ Post a Demand</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Active Demands</Text>
        <Text style={styles.count}>{demands.length}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={demands}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No demands yet</Text>
              <Text style={styles.emptyText}>
                Post what you need and let nearby producers find you.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.product}>{item.product_name}</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>ACTIVE</Text>
                </View>
              </View>

              <Text style={styles.quantity}>
                {item.required_quantity} {item.unit}
              </Text>

              {item.min_price !== null && item.max_price !== null && (
                <Text style={styles.detail}>
                  Budget: ₹{item.min_price}–₹{item.max_price}/{item.unit}
                </Text>
              )}

              {item.required_by && (
                <Text style={styles.detail}>
                  Required by: {item.required_by}
                </Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F4",
    padding: 24,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#66705D",
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#182018",
  },

  subtitle: {
    fontSize: 15,
    color: "#70776D",
    marginTop: 5,
  },

  logout: {
    color: "#8B3A3A",
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: "#243524",
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#182018",
  },

  count: {
    marginLeft: 8,
    backgroundColor: "#E1E8DC",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "700",
    color: "#40513D",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E8E1",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  product: {
    fontSize: 19,
    fontWeight: "800",
    color: "#202820",
  },

  badge: {
    backgroundColor: "#E6EFE2",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#496043",
  },

  quantity: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    color: "#354335",
  },

  detail: {
    fontSize: 13,
    color: "#777E75",
    marginTop: 6,
  },

  empty: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 25,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#303830",
  },

  emptyText: {
    textAlign: "center",
    color: "#7A8178",
    marginTop: 8,
    lineHeight: 20,
  },
});