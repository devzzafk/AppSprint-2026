import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BuyerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <View style={styles.icon}>
          <Text style={styles.iconText}>🛒</Text>
        </View>

        <Text style={styles.title}>Welcome, Buyer</Text>

        <Text style={styles.subtitle}>
          Tell us what you need. Let local producers find you.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>With LinkHarvest you can</Text>

          <Text style={styles.feature}>✓ Post your product requirements</Text>
          <Text style={styles.feature}>✓ Discover nearby producers</Text>
          <Text style={styles.feature}>✓ Compare relevant matches</Text>
          <Text style={styles.feature}>✓ Connect directly with suppliers</Text>
        </View>

        <View style={styles.bottom}>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.buttonText}>Continue as Buyer</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9F5",
  },
  content: {
    flex: 1,
    padding: 28,
  },
  back: {
    fontSize: 16,
    fontWeight: "600",
    color: "#53635A",
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#E4EFE6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
    marginBottom: 24,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#173F2A",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 25,
    color: "#68756D",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    marginTop: 35,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#25352B",
    marginBottom: 18,
  },
  feature: {
    fontSize: 15,
    color: "#526158",
    marginBottom: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#173F2A",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});