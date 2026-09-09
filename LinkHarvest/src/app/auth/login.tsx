import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.icon}>🌾</Text>

          <Text style={styles.title}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue connecting supply with demand.
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9AA69E"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9AA69E"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={styles.button}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </Pressable>

          <Pressable
            style={styles.register}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.registerText}>
              Don't have an account?{" "}
              <Text style={styles.link}>
                Create one
              </Text>
            </Text>
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

  header: {
    marginTop: 65,
    marginBottom: 40,
  },

  icon: {
    fontSize: 38,
    marginBottom: 18,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#173F2A",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#68756D",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#344239",
    marginTop: 14,
    marginBottom: 6,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D8E1DA",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#25352B",
  },

  button: {
    height: 56,
    borderRadius: 17,
    backgroundColor: "#173F2A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  register: {
    alignItems: "center",
    marginTop: 22,
  },

  registerText: {
    color: "#68756D",
    fontSize: 14,
  },

  link: {
    color: "#173F2A",
    fontWeight: "800",
  },
});