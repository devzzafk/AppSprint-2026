# 📱 LinkHarvest 

<p align="center">

![Built for AppSprint 2026](https://img.shields.io/badge/Built%20for-AppSprint%202025-7C3AED?style=for-the-badge)

![Hackathon](https://img.shields.io/badge/Hackathon-AppSprint%202025-blueviolet?style=for-the-badge)

</p>

<p align="center">
  A mobile application built during <b>AppSprint Solution Challenge 2026</b>
</p>

---

# 👥 Team Information

## Team Name

Team Name: LinkHarvest
Team Size: 1
Participation Type: Individual

Team Member:

Devi Chandran S

## Challenge Track

Choose one:


- 🌾 AgriTech / LocalTech
 A demand-driven market linkage platform connecting local producers with commercial buyers through intelligent matching, direct negotiation, and regional supply intelligence ! 

---

# 📖 Problem Statement

## The problem isn't always production. It's market access.

Small farmers and local producers often have products ready to sell but struggle to find the **right buyer at the right time, quantity, location, and price**.

At the same time, restaurants, hotels, hospitals, retailers, wholesalers, and other commercial buyers regularly need specific agricultural products but face difficulty discovering reliable local suppliers who can meet their requirements.

This creates a disconnect between **available supply and actual demand**.

### Who faces this problem?

**Local Producers**
- Farmers and small-scale producers with harvest-ready products
- Producer collectives and local suppliers
- Producers operating with limited access to digital markets

**Commercial Buyers**
- Restaurants and hotels
- Hospitals and institutional kitchens
- Retailers and wholesalers
- Businesses requiring predictable agricultural supply

### Why is this important?

A producer may have hundreds of kilograms of a crop available while a nearby business may simultaneously be looking for that exact product.

Yet the two may never discover each other.

This can lead to:

Available Supply
       ↓
Poor Market Visibility
       ↓
Missed Buyer Connections
       ↓
Unsold / Under-valued Produce
---

# 💡 Solution

## A reverse marketplace built around real demand.

**LinkHarvest** changes the traditional agricultural marketplace model.

Instead of asking producers to list their products and wait for buyers to discover them, commercial buyers can **post what they actually need**, and LinkHarvest identifies producers who can potentially fulfill that demand.

The platform creates a direct loop:

> **Demand → Match → Connect → Trade**

---

## How LinkHarvest Solves the Problem

### 01 // Buyers publish real demand

Commercial buyers can create structured requirements including:

- Crop / product
- Quantity required
- Quality or grade
- Target price
- Delivery deadline
- Location

This transforms vague market demand into a **specific procurement opportunity**.

### 02 // Producers discover relevant opportunities

Producers don't have to manually search through hundreds of listings.

LinkHarvest surfaces buyer demands that align with their available or expected supply.

A producer can see:

```text
WHAT CAN I SELL?

Banana
300 kg available

92% MATCH

Buyer needs
250 kg

Target price
₹40 – ₹45 / kg

Distance
12 km
---

# ✨ Features

## `01` Reverse Marketplace

**Demand → Supply**

- Commercial buyers post real-time procurement requirements.
- Producers discover active buyer demands matching their crops.
- Dedicated Producer and Buyer workspaces.
- Seamless role switching between Producer and Buyer.

---

## `02` HarvestMatch Engine

**Find the right producer for the right demand.**

- 0–100% Fit Index
- Crop & quality compatibility
- Price parity analysis
- Geospatial proximity
- Quantity & batch alignment
- Transparent score breakdown
- Explainable matching instead of black-box recommendations

```text
Crop & Quality       35%
Price Parity         25%
Proximity            20%
Quantity             20%
────────────────────────
Total               100%
---

# 📱 Screenshots

Add screenshots of your application here.

Example:

```
assets/
│
├── home.png
├── login.png
├── profile.png
└── settings.png
```

## Screenshots

| Screen | Preview |
|---|---|
| Home Screen | Add Image |
| Feature Screen | Add Image |
| Profile Screen | Add Image |

---

# 🎥 Demo Video

Add your demo video link.

Example:

```
https://youtube.com/your-demo-link
```

Demo duration:

**Maximum: 2 minutes**

Your video should show:

- Problem
- Solution
- Main features
- App workflow

---

# 📦 APK Download



Add your release link below:

```
https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/releases
```

---

# 🛠️ Tech Stack

LinkHarvest is built as a cross-platform mobile application with a cloud-backed architecture and an offline-first design.

---

## Frontend / Mobile Framework

- **React Native** — Cross-platform mobile application
- **Expo** — Development and application tooling
- **TypeScript** — Type-safe application development
- **Expo Router** — File-based navigation

---

## Backend

- **Supabase** — Backend-as-a-Service
- **Supabase Auth** — User authentication and session management
- **Supabase REST** — Database access from the application
- **Supabase Realtime** — Real-time data synchronization
- **Supabase Storage** — File and media storage

---

## Database

- **PostgreSQL** — Primary cloud database
- **Local persistence / Sync Queue** — Offline-first data handling

Core database entities include:

Profiles
Products
Demands
Connections

APIS USED

| Service                 | Purpose                              |
| ----------------------- | ------------------------------------ |
| **Supabase Auth**       | Authentication & user sessions       |
| **Supabase PostgreSQL** | Application data                     |
| **Supabase Realtime**   | Live data synchronization            |
| **Supabase Storage**    | File / media storage                 |
| **Geospatial Services** | Distance and regional matching       |
| **Voice Processing**    | Voice-to-structured listing workflow |

┌─────────────────────────────┐
│      React Native + Expo    │
│         TypeScript          │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│      Application Services   │
│                             │
│  HarvestMatch │ Offline     │
│  Voice        │ Logistics   │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│          Supabase           │
│                             │
│ Auth │ REST │ Realtime      │
│ Storage │ PostgreSQL        │
└─────────────────────────────┘


---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

## Navigate to Project

```bash
cd YOUR_PROJECT_NAME
```

## Install Dependencies

### Flutter

```bash
flutter pub get
```

### React Native

```bash
npm install
```

## Run Application

### Flutter

```bash
flutter run
```

### React Native

```bash
npm start
```

---

# 📂 Project Structure

Explain your project structure.

Example:

```
project/
│
├── assets/
├── lib/
├── screens/
├── widgets/
├── services/
└── README.md
```

---

# 🌟 Key Highlights

Mention what makes your project special.

Examples:

- Unique approach
- Technical challenges solved
- Innovation
- Real-world usability

---

# 🔮 Future Improvements

Features planned for future versions:

- Feature 1
- Feature 2
- Feature 3

---

# 📊 Impact

Explain the expected impact of your application.

Include:

- Target users
- Benefits
- Social/community impact

---

# 📜 License

This project is licensed under the MIT License.

---

# 🏆 AppSprint Solution Challenge 2026

Built with ❤️ during **AppSprint Solution Challenge 2026**

Organized by:

**App Development IG · muLearn LBSITW**

---
