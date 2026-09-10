export type Product = {
  id: string;
  producer_id: string;
  name: string;
  category: string | null;
  quantity: number;
  unit: string;
  expected_price: number | null;
  available_from: string | null;
  latitude: number | null;
  longitude: number | null;
  district: string | null;
  city: string | null;
};

export type Demand = {
  id: string;
  buyer_id: string;
  product_name: string;
  category: string | null;
  required_quantity: number;
  unit: string;
  min_price: number | null;
  max_price: number | null;
  required_by: string | null;
  latitude: number | null;
  longitude: number | null;
  district: string | null;
  city: string | null;
};

export type MatchResult = {
  score: number;
  productScore: number;
  quantityScore: number;
  locationScore: number;
  priceScore: number;
  availabilityScore: number;
};

function normalize(value: string | null | undefined) {
  return value?.trim().toLowerCase() || "";
}

function calculateProductScore(
  product: Product,
  demand: Demand
) {
  const productName = normalize(product.name);
  const demandName = normalize(demand.product_name);

  if (productName === demandName) {
    return 100;
  }

  if (
    productName.includes(demandName) ||
    demandName.includes(productName)
  ) {
    return 80;
  }

  const productCategory = normalize(product.category);
  const demandCategory = normalize(demand.category);

  if (
    productCategory &&
    demandCategory &&
    productCategory === demandCategory
  ) {
    return 50;
  }

  return 0;
}

function calculateQuantityScore(
  product: Product,
  demand: Demand
) {
  if (product.unit !== demand.unit) {
    return 0;
  }

  if (product.quantity >= demand.required_quantity) {
    return 100;
  }

  const ratio =
    product.quantity / demand.required_quantity;

  return Math.round(Math.max(0, ratio * 100));
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

function calculateLocationScore(
  product: Product,
  demand: Demand
) {
  if (
    product.latitude == null ||
    product.longitude == null ||
    demand.latitude == null ||
    demand.longitude == null
  ) {
    const sameDistrict =
      normalize(product.district) ===
      normalize(demand.district);

    const sameCity =
      normalize(product.city) ===
      normalize(demand.city);

    if (sameCity) return 100;
    if (sameDistrict) return 80;

    return 30;
  }

  const distance = calculateDistance(
    product.latitude,
    product.longitude,
    demand.latitude,
    demand.longitude
  );

  if (distance <= 5) return 100;
  if (distance <= 10) return 90;
  if (distance <= 20) return 75;
  if (distance <= 50) return 50;

  return 20;
}

function calculatePriceScore(
  product: Product,
  demand: Demand
) {
  if (
    product.expected_price == null ||
    demand.min_price == null ||
    demand.max_price == null
  ) {
    return 50;
  }

  const price = product.expected_price;

  if (
    price >= demand.min_price &&
    price <= demand.max_price
  ) {
    return 100;
  }

  if (price < demand.min_price) {
    const difference =
      demand.min_price - price;

    return Math.max(
      0,
      Math.round(100 - difference * 5)
    );
  }

  const difference =
    price - demand.max_price;

  return Math.max(
    0,
    Math.round(100 - difference * 5)
  );
}

function calculateAvailabilityScore(
  product: Product,
  demand: Demand
) {
  if (!product.available_from || !demand.required_by) {
    return 50;
  }

  const available = new Date(product.available_from);
  const required = new Date(demand.required_by);

  if (available <= required) {
    return 100;
  }

  const difference =
    available.getTime() - required.getTime();

  const daysLate =
    difference / (1000 * 60 * 60 * 24);

  if (daysLate <= 2) return 60;
  if (daysLate <= 5) return 30;

  return 0;
}

export function calculateMatch(
  product: Product,
  demand: Demand
): MatchResult {
  const productScore =
    calculateProductScore(product, demand);

  const quantityScore =
    calculateQuantityScore(product, demand);

  const locationScore =
    calculateLocationScore(product, demand);

  const priceScore =
    calculatePriceScore(product, demand);

  const availabilityScore =
    calculateAvailabilityScore(product, demand);

  const score = Math.round(
    productScore * 0.35 +
      quantityScore * 0.20 +
      locationScore * 0.20 +
      priceScore * 0.15 +
      availabilityScore * 0.10
  );

  return {
    score,
    productScore,
    quantityScore,
    locationScore,
    priceScore,
    availabilityScore,
  };
}