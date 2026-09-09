import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();

  const { role } = useLocalSearchParams<{ role?: string }>();

  const isProducer = role === "producer";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>← Back</Text>
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.icon}>
              {isProducer ? "🌱" : "🛒"}
            </Text>

            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.subtitle}>
              {isProducer
                ? "Start finding markets for what you produce."
                : "Start finding local producers for what you need."}
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>
              {isProducer
                ? "Full name"
                : "Business / organization name"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={
                isProducer
                  ? "Enter your full name"
                  : "Enter business name"
              }
              placeholderTextColor="#9AA69E"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Phone number</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#9AA69E"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9AA69E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#9AA69E"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              style={styles.button}
              onPress={() => router.push("/auth/login")}
            >
              <Text style={styles.buttonText}>
                Create account
              </Text>
            </Pressable>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <Pressable
                onPress={() => router.push("/auth/login")}
              >
                <Text style={styles.loginLink}> Log in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F7F9F5",
  },

  content: {
    padding: 28,
    paddingBottom: 40,
  },

  back: {
    fontSize: 16,
    fontWeight: "600",
    color: "#53635A",
  },

  header: {
    marginTop: 42,
    marginBottom: 32,
  },

  icon: {
    fontSize: 36,
    marginBottom: 18,
  },

  title: {
    fontSize: 31,
    fontWeight: "800",
    color: "#173F2A",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#68756D",
  },

  form: {
    gap: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#344239",
    marginTop: 12,
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
    marginTop: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  loginText: {
    color: "#68756D",
    fontSize: 14,
  },

  loginLink: {
    color: "#173F2A",
    fontSize: 14,
    fontWeight: "800",
  },
});