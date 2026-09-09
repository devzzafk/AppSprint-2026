import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>LH</Text>
        </View>

        <Text style={styles.title}>LinkHarvest</Text>

        <Text style={styles.tagline}>
          Don’t search for a market.{"\n"}
          Let the market find you.
        </Text>

        <Text style={styles.description}>
          Connect local producers with real buyer demand.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.question}>How do you want to use LinkHarvest?</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/role/producer")}
        >
          <Text style={styles.buttonIcon}>🌱</Text>
          <View>
            <Text style={styles.buttonTitle}>I’m a Producer</Text>
            <Text style={styles.buttonSubtitle}>
              Sell what you produce
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push("/role/buyer")}
        >
          <Text style={styles.buttonIcon}>🛒</Text>
          <View>
            <Text style={styles.buttonTitle}>I’m a Buyer</Text>
            <Text style={styles.buttonSubtitle}>
              Find local suppliers
            </Text>
          </View>
        </Pressable>

        <Text style={styles.footer}>Demand → Match → Connect → Trade</Text>
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
    paddingHorizontal: 28,
    paddingTop: 55,
    paddingBottom: 24,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#173F2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#173F2A",
    letterSpacing: -1,
  },
  tagline: {
    marginTop: 16,
    fontSize: 23,
    lineHeight: 31,
    fontWeight: "700",
    color: "#25352B",
  },
  description: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#66736A",
    maxWidth: 330,
  },
  spacer: {
    flex: 1,
    minHeight: 45,
  },
  question: {
    fontSize: 15,
    fontWeight: "700",
    color: "#344239",
    marginBottom: 14,
  },
  primaryButton: {
    minHeight: 78,
    borderRadius: 20,
    backgroundColor: "#173F2A",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    minHeight: 78,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE4DD",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    fontSize: 25,
    marginRight: 15,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  buttonSubtitle: {
    fontSize: 13,
    marginTop: 3,
    color: "#D4E3D8",
  },
  footer: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 12,
    fontWeight: "600",
    color: "#829087",
    letterSpacing: 0.5,
  },
});