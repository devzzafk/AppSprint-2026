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

export default function AddSupplyScreen() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [price, setPrice] = useState("");
  const [district, setDistrict] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSupply = async () => {
    if (!name.trim() || !quantity.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter the product name and quantity."
      );
      return;
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = price.trim() ? Number(price) : null;

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert("Invalid quantity", "Enter a valid quantity.");
      return;
    }

    if (price.trim() && (isNaN(parsedPrice!) || parsedPrice! < 0)) {
      Alert.alert("Invalid price", "Enter a valid expected price.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Session expired", "Please log in again.");
        router.replace("/auth/login");
        return;
      }

      const { error } = await supabase.from("products").insert({
        producer_id: user.id,
        name: name.trim(),
        category: category.trim() || null,
        quantity: parsedQuantity,
        unit: unit.trim() || "kg",
        expected_price: parsedPrice,
        district: district.trim() || null,
        notes: notes.trim() || null,
        status: "active",
      });

      if (error) {
        Alert.alert("Couldn't add product", error.message);
        return;
      }

      Alert.alert(
        "Supply added!",
        `${name.trim()} has been added to your inventory.`,
        [
          {
            text: "Done",
            onPress: () => router.replace("/dashboard/producer"),
          },
        ]
      );
    } catch (error) {
      console.log(error);

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
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Add supply</Text>

        <Text style={styles.subtitle}>
          Tell buyers what you currently have available.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Product name *</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Tomato"
            placeholderTextColor="#929892"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Category</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Vegetables"
            placeholderTextColor="#929892"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Quantity *</Text>

          <View style={styles.quantityRow}>
            <TextInput
              style={[styles.input, styles.quantityInput]}
              placeholder="e.g. 500"
              placeholderTextColor="#929892"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />

            <TextInput
              style={[styles.input, styles.unitInput]}
              placeholder="kg"
              placeholderTextColor="#929892"
              value={unit}
              onChangeText={setUnit}
            />
          </View>

          <Text style={styles.label}>Expected price</Text>

          <View style={styles.priceRow}>
            <View style={styles.rupeeBox}>
              <Text style={styles.rupee}>₹</Text>
            </View>

            <TextInput
              style={[styles.input, styles.priceInput]}
              placeholder="e.g. 32 per kg"
              placeholderTextColor="#929892"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <Text style={styles.helper}>
            Buyers will see this as your expected price.
          </Text>

          <Text style={styles.label}>District</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Thiruvananthapuram"
            placeholderTextColor="#929892"
            value={district}
            onChangeText={setDistrict}
          />

          <Text style={styles.label}>Notes</Text>

          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Quality, variety, availability details..."
            placeholderTextColor="#929892"
            multiline
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleAddSupply}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Adding supply..." : "Add to inventory"}
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
    padding: 22,
    paddingTop: 60,
    paddingBottom: 50,
  },

  back: {
    fontSize: 16,
    color: "#365B3A",
    fontWeight: "700",
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#172117",
  },

  subtitle: {
    fontSize: 15,
    color: "#687168",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 25,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#303830",
    marginTop: 17,
    marginBottom: 8,
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

  quantityRow: {
    flexDirection: "row",
    gap: 10,
  },

  quantityInput: {
    flex: 1,
  },

  unitInput: {
    width: 90,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rupeeBox: {
    height: 54,
    width: 54,
    borderRadius: 14,
    backgroundColor: "#E7EFE2",
    alignItems: "center",
    justifyContent: "center",
  },

  rupee: {
    fontSize: 20,
    fontWeight: "800",
    color: "#365B3A",
  },

  priceInput: {
    flex: 1,
  },

  helper: {
    fontSize: 12,
    color: "#858C85",
    marginTop: 7,
  },

  notesInput: {
    height: 100,
    paddingTop: 15,
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
});