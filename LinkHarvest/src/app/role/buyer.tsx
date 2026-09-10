import { Text, View } from "react-native";

export default function BuyerDashboard() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F8F2",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "800" }}>
        Buyer Dashboard
      </Text>

      <Text style={{ marginTop: 10 }}>
        LinkHarvest is connected!
      </Text>
    </View>
  );
}