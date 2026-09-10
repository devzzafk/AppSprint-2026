import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function RegisterScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !email || !password) {
      Alert.alert("Missing information", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password too short",
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert("Registration failed", error.message);
        return;
      }

      if (!data.user) {
        Alert.alert("Registration failed", "Could not create your account.");
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name: name.trim(),
          phone: phone.trim(),
          role: role === "buyer" ? "buyer" : "producer",
        });

      if (profileError) {
        Alert.alert("Profile error", profileError.message);
        return;
      }

      Alert.alert(
        "Account created!",
        "Your LinkHarvest account has been created successfully.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Something went wrong",
        "Please check your internet connection and try again."
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
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.logo}>LinkHarvest</Text>

          <Text style={styles.title}>Create your account</Text>

          <Text style={styles.subtitle}>
            Join the local market network as a{" "}
            {role === "buyer" ? "buyer" : "producer"}.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#8A8A8A"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Phone number</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#8A8A8A"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

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
            placeholder="Create a password"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating account..." : "Create account"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 50,
  },

  back: {
    fontSize: 16,
    color: "#365B3A",
    fontWeight: "600",
    marginBottom: 35,
  },

  header: {
    marginBottom: 35,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#365B3A",
    marginBottom: 25,
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

  loginButton: {
    alignItems: "center",
    marginTop: 22,
  },

  loginText: {
    color: "#687168",
    fontSize: 14,
  },

  loginBold: {
    color: "#365B3A",
    fontWeight: "800",
  },
});