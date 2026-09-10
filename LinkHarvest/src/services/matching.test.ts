import { calculateMatch } from "./matching";

const demand = {
  id: "d1",
  buyer_id: "b1",
  product_name: "Tomato",
  category: "Vegetables",
  required_quantity: 500,
  unit: "kg",
  min_price: 30,
  max_price: 35,
  required_by: "2026-09-15",
  latitude: 8.5241,
  longitude: 76.9366,
  district: "Thiruvananthapuram",
  city: "Trivandrum",
};

const product = {
  id: "p1",
  producer_id: "p1",
  name: "Tomato",
  category: "Vegetables",
  quantity: 450,
  unit: "kg",
  expected_price: 32,
  available_from: "2026-09-12",
  latitude: 8.5241,
  longitude: 76.9366,
  district: "Thiruvananthapuram",
  city: "Trivandrum",
};

const result = calculateMatch(product, demand);

console.log("Harvest Match:", result);