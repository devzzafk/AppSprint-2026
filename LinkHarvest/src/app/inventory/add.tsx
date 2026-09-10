import { router } from "expo-router";
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

export default function AddDemand() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [requiredBy, setRequiredBy] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitDemand() {
    if (!productName.trim() || !quantity.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter the product and required quantity."
      );
      return;
    }

    const numericQuantity = Number(quantity);

    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      Alert.alert("Invalid quantity", "Enter a valid quantity.");
      return;
    }

    if (minPrice && isNaN(Number(minPrice))) {
      Alert.alert("Invalid price", "Enter a valid minimum price.");
      return;
    }

    if (maxPrice && isNaN(Number(maxPrice))) {
      Alert.alert("Invalid price", "Enter a valid maximum price.");
      return;
    }

    if (
      minPrice &&
      maxPrice &&
      Number(minPrice) > Number(maxPrice)
    ) {
      Alert.alert(
        "Invalid price range",
        "Minimum price cannot be greater than maximum price."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Session expired", "Please log in again.");
        router.replace("/auth/login");
        return;
      }

      const { error } = await supabase.from("demands").insert({
        buyer_id: user.id,
        product_name: productName.trim(),
        category: category.trim() || null,
        required_quantity: numericQuantity,
        unit: unit.trim() || "kg",
        min_price: minPrice ? Number(minPrice) : null,
        max_price: maxPrice ? Number(maxPrice) : null,
        required_by: requiredBy.trim() || null,
        district: district.trim() || null,
        city: city.trim() || null,
        status: "active",
        notes: notes.trim() || null,
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        "Demand posted",
        "Your demand is now visible in LinkHarvest.",
        [
          {
            text: "View demands",
            onPress: () => router.replace("/dashboard/buyer"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Couldn't post demand",
        error?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>BUYER</Text>

        <Text style={styles.title}>Post a demand</Text>

        <Text style={styles.subtitle}>
          Tell local producers what you need. LinkHarvest will help
          connect the right supply to you.
        </Text>

        <Text style={styles.label}>What do you need?</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Tomato"
          placeholderTextColor="#92988F"
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>Category</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Vegetables"
          placeholderTextColor="#92988F"
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.row}>
          <View style={styles.quantityBox}>
            <Text style={styles.label}>Quantity</Text>

            <TextInput
              style={styles.input}
              placeholder="500"
              placeholderTextColor="#92988F"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <View style={styles.unitBox}>
            <Text style={styles.label}>Unit</Text>

            <TextInput
              style={styles.input}
              placeholder="kg"
              placeholderTextColor="#92988F"
              value={unit}
              onChangeText={setUnit}
            />
          </View>
        </View>

        <Text style={styles.label}>Acceptable price range</Text>

        <View style={styles.row}>
          <View style={styles.priceBox}>
            <TextInput
              style={styles.input}
              placeholder="Min ₹"
              placeholderTextColor="#92988F"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
          </View>

          <View style={styles.priceBox}>
            <TextInput
              style={styles.input}
              placeholder="Max ₹"
              placeholderTextColor="#92988F"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
          </View>
        </View>

        <Text style={styles.label}>Required by</Text>

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#92988F"
          value={requiredBy}
          onChangeText={setRequiredBy}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Location</Text>

        <TextInput
          style={styles.input}
          placeholder="District"
          placeholderTextColor="#92988F"
          value={district}
          onChangeText={setDistrict}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#92988F"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Additional notes</Text>

        <TextInput
          style={[styles.input, styles.notes]}
          placeholder="Quality requirements, preferred variety, delivery details..."
          placeholderTextColor="#92988F"
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            loading && styles.disabledButton,
          ]}
          onPress={submitDemand}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? "Posting..." : "Post Demand"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your demand can later be matched with nearby producers.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F4",
  },

  content: {
    padding: 24,
    paddingTop: 55,
    paddingBottom: 50,
  },

  backButton: {
    marginBottom: 28,
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4E5E49",
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#66705D",
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#182018",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#737A70",
    marginTop: 8,
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#394238",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E4DC",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: "#202820",
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  quantityBox: {
    flex: 2,
  },

  unitBox: {
    flex: 1,
  },

  priceBox: {
    flex: 1,
  },

  notes: {
    minHeight: 110,
  },

  submitButton: {
    backgroundColor: "#243524",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 28,
  },

  disabledButton: {
    opacity: 0.6,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  footerText: {
    textAlign: "center",
    color: "#858B82",
    fontSize: 12,
    marginTop: 14,
  },
});