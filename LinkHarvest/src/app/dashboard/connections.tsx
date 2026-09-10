import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Connection = {
  id: string;
  status: string;
  demand_id: string;
  product_id: string;
  buyer_id: string;
  demands: {
    product_name: string;
    required_quantity: number;
    unit: string;
    min_price: number | null;
    max_price: number | null;
    required_by: string | null;
  } | null;
  products: {
    name: string;
    quantity: number;
    unit: string;
    expected_price: number | null;
  } | null;
};

export default function ConnectionsScreen() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, []);

  async function loadConnections() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const { data, error } = await supabase
        .from("connections")
        .select(`
          id,
          status,
          demand_id,
          product_id,
          buyer_id,
          demands (
            product_name,
            required_quantity,
            unit,
            min_price,
            max_price,
            required_by
          ),
          products (
            name,
            quantity,
            unit,
            expected_price
          )
        `)
        .eq("producer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setConnections((data as unknown as Connection[]) || []);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Couldn't load connections",
        "Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateConnection(
    connectionId: string,
    status: "accepted" | "rejected"
  ) {
    const { error } = await supabase
      .from("connections")
      .update({ status })
      .eq("id", connectionId);

    if (error) {
      Alert.alert("Update failed", error.message);
      return;
    }

    setConnections((current) =>
      current.map((connection) =>
        connection.id === connectionId
          ? { ...connection, status }
          : connection
      )
    );
  }

  function renderConnection({
    item,
  }: {
    item: Connection;
  }) {
    const demand = item.demands;
    const product = item.products;

    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>
              BUYER INTEREST
            </Text>

            <Text style={styles.productName}>
              {demand?.product_name ||
                product?.name ||
                "Product"}
            </Text>
          </View>

          <View
            style={[
              styles.status,
              item.status === "accepted" &&
                styles.accepted,
              item.status === "rejected" &&
                styles.rejected,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.requestBox}>
          <Text style={styles.requestTitle}>
            Buyer needs
          </Text>

          <Text style={styles.requestValue}>
            {demand?.required_quantity}{" "}
            {demand?.unit}
          </Text>

          {demand?.min_price !== null &&
            demand?.max_price !== null && (
              <Text style={styles.detail}>
                Budget: ₹{demand?.min_price}–₹
                {demand?.max_price}/{demand?.unit}
              </Text>
            )}

          {demand?.required_by && (
            <Text style={styles.detail}>
              Required by: {demand.required_by}
            </Text>
          )}
        </View>

        <View style={styles.supplyBox}>
          <Text style={styles.requestTitle}>
            Your supply
          </Text>

          <Text style={styles.detail}>
            {product?.quantity} {product?.unit}
          </Text>

          <Text style={styles.detail}>
            Expected price:{" "}
            {product?.expected_price
              ? `₹${product.expected_price}/${product.unit}`
              : "Negotiable"}
          </Text>
        </View>

        {item.status === "pending" && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() =>
                updateConnection(
                  item.id,
                  "rejected"
                )
              }
            >
              <Text style={styles.rejectText}>
                Reject
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() =>
                updateConnection(
                  item.id,
                  "accepted"
                )
              }
            >
              <Text style={styles.acceptText}>
                Accept Interest
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === "accepted" && (
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              router.push({
                pathname: "/dashboard/messages",
                params: {
                  connectionId: item.id,
                },
              })
            }
          >
            <Text style={styles.messageText}>
              Message Buyer →
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>
          LINKHARVEST
        </Text>

        <Text style={styles.title}>
          Connections
        </Text>

        <Text style={styles.subtitle}>
          Manage buyers interested in your supply.
        </Text>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>
            Loading connections...
          </Text>
        </View>
      ) : (
        <FlatList
          data={connections}
          keyExtractor={(item) => item.id}
          renderItem={renderConnection}
          contentContainerStyle={styles.list}
          onRefresh={loadConnections}
          refreshing={loading}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No buyer interests yet
              </Text>

              <Text style={styles.emptyText}>
                When a buyer finds your supply through
                Harvest Match, their requests will
                appear here.
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
    padding: 24,
    paddingTop: 55,
    paddingBottom: 20,
  },

  back: {
    color: "#4E5E49",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 25,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#687363",
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#182018",
  },

  subtitle: {
    fontSize: 14,
    color: "#737A70",
    marginTop: 6,
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

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  productName: {
    fontSize: 21,
    fontWeight: "900",
    color: "#202820",
  },

  status: {
    backgroundColor: "#FFF3D8",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },

  accepted: {
    backgroundColor: "#E5EEE1",
  },

  rejected: {
    backgroundColor: "#F3E4E4",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#59634F",
  },

  requestBox: {
    backgroundColor: "#F7F9F5",
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
  },

  supplyBox: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEFE9",
  },

  requestTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7A8177",
    marginBottom: 5,
  },

  requestValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#344134",
    marginBottom: 5,
  },

  detail: {
    fontSize: 13,
    color: "#70786E",
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  rejectButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D9BDBD",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
  },

  rejectText: {
    color: "#8B4C4C",
    fontWeight: "700",
  },

  acceptButton: {
    flex: 1.5,
    backgroundColor: "#243524",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
  },

  acceptText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  messageButton: {
    backgroundColor: "#E5EEE1",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },

  messageText: {
    color: "#385035",
    fontWeight: "800",
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
    paddingTop: 70,
    paddingHorizontal: 25,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#303830",
  },

  emptyText: {
    textAlign: "center",
    color: "#777E75",
    lineHeight: 21,
    marginTop: 8,
  },
});