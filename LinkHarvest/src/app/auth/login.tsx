import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing information", "Enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert("Login failed", error.message);
        return;
      }

      if (!data.user) {
        Alert.alert("Login failed", "Could not sign you in.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        Alert.alert("Profile error", profileError.message);
        return;
      }

      if (profile.role === "producer") {
        router.replace("/dashboard/producer");
      } else {
        router.replace("/dashboard/buyer");
      }
    } catch {
      Alert.alert(
        "Something went wrong",
        "Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>LinkHarvest</Text>

        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue connecting supply with demand.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#8A8A8A"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign in"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("/role/producer")}
          >
            <Text style={styles.registerText}>
              Don't have an account?{" "}
              <Text style={styles.registerBold}>Create one</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },

  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },

  back: {
    fontSize: 16,
    color: "#365B3A",
    fontWeight: "600",
    marginBottom: 45,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#365B3A",
    marginBottom: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#172117",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#687168",
    marginBottom: 35,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#303830",
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D8DDD4",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#172117",
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#365B3A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  registerButton: {
    alignItems: "center",
    marginTop: 22,
  },

  registerText: {
    color: "#687168",
    fontSize: 14,
  },

  registerBold: {
    color: "#365B3A",
    fontWeight: "800",
  },
});