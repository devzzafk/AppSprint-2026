# 🌾 LinkHarvest

### **Don’t search for a market. Let the market find you.**

> A demand-driven market linkage platform connecting local producers directly with commercial buyers.

<p align="center">

[![Built for AppSprint 2026](https://img.shields.io/badge/Built%20for-AppSprint%202026-7C3AED?style=for-the-badge)](https://github.com/devzzafk/AppSprint-2026)
[![Track](https://img.shields.io/badge/Track-AgriTech%20%2F%20LocalTech-2E7D32?style=for-the-badge)](https://github.com/devzzafk/AppSprint-2026)
[![Platform](https://img.shields.io/badge/Platform-Mobile-111827?style=for-the-badge)](https://linkharvests.netlify.app/)
[![Status](https://img.shields.io/badge/Status-Prototype-2563EB?style=for-the-badge)](https://linkharvests.netlify.app/)

</p>

<p align="center">

**Demand → Match → Connect → Trade**

</p>

<p align="center">

[Live Product](https://linkharvests.netlify.app/) •
[GitHub Repository](https://github.com/devzzafk/AppSprint-2026)

</p>

---

# 01 // Project

**LinkHarvest** is a demand-driven agricultural market linkage platform built for the **AppSprint Solution Challenge 2026**.

Instead of forcing producers to search through marketplaces for buyers, LinkHarvest reverses the traditional marketplace model.

### Traditional Marketplace

```text
Producer
   ↓
Lists Product
   ↓
Waits
   ↓
Buyer Searches
LinkHarvest
Buyer
   ↓
Posts Real Demand
   ↓
HarvestMatch Engine
   ↓
Suitable Producers
   ↓
Negotiation
   ↓
Deal

The goal is simple:

Turn available local supply into visible commercial opportunities.

02 // Team Information
Team Name

LinkHarvest

Participation

Individual

Builder
Name	Role
Devi Chandran S.	Product · Development · Research
Challenge Track

AgriTech / LocalTech

03 // Problem Statement
The problem isn't always production.
It's market access.

Small farmers and local producers can have harvest-ready products without knowing who needs them, where they need them, how much they need, or what price they are willing to pay.

At the same time, commercial buyers such as:

Restaurants
Hotels
Hospitals
Retail chains
Wholesalers
Institutional kitchens

often need specific products, quantities, quality grades and delivery timelines.

The two sides already exist.

They simply aren't connected efficiently.
             LOCAL PRODUCER
                   │
          Has supply available
                   │
                   ×
              MARKET GAP
                   ×
                   │
          Buyer has demand
                   │
             COMMERCIAL BUYER
Existing marketplace model

Most digital marketplaces follow:

Seller → Listing → Search → Discovery

This puts the responsibility on producers to continuously find buyers.

LinkHarvest changes the direction.

Buyer Demand → Matching → Producer Opportunity

04 // Solution
A reverse marketplace for local supply.

LinkHarvest allows commercial buyers to publish what they actually need.

Producers can then discover relevant opportunities based on:

Crop
Quality / grade
Quantity
Price
Location
Availability
Delivery feasibility
Core workflow
┌───────────────┐
│ Buyer Demand  │
└───────┬───────┘
        ↓
┌────────────────┐
│ HarvestMatch   │
│ Matching Engine│
└───────┬────────┘
        ↓
┌────────────────┐
│ Producer Match │
└───────┬────────┘
        ↓
┌────────────────┐
│ Negotiation    │
└───────┬────────┘
        ↓
┌────────────────┐
│ Deal Locked    │
└────────────────┘
The product loop

Demand → Match → Connect → Trade

05 // Features
01 — Dual-Sided Reverse Marketplace

Two dedicated workspaces for the two sides of the agricultural supply chain.

Producer
View active commercial buyer demands
Discover matching crop opportunities
Compare farmgate prices with local mandi benchmarks
Manage current supply
Express interest in buyer requirements
Connect directly with buyers
Commercial Buyer
Create crop requirements
Specify quantity
Define quality grade
Set target price
Add delivery deadline
Discover suitable regional producers
Initiate negotiations
02 — HarvestMatch Engine
0 → 100% Fit Index

LinkHarvest doesn't simply show listings.

It calculates how well a producer fits a buyer's actual requirement.

Matching factors
Factor	Weight
Crop & Quality Match	35%
Price Parity	25%
Geospatial Proximity	20%
Quantity & Batch Alignment	20%

Every match is explainable.

Users can open the Score Breakdown to understand exactly why a match received its score.

MATCH SCORE

██████████████████░░   92%

Crop & Quality       + 33
Price Parity         + 23
Proximity            + 18
Quantity Alignment   + 18
                     ─────
                       92

No black-box recommendation.

Every score has a reason.

03 — What Can I Sell?

A producer shouldn't have to guess what the market wants.

The opportunity layer reverses the question:

"What can I sell right now?"

The system surfaces active buyer demands that align with the producer's available inventory.

Example:

BANANA

300 kg available

92% MATCH

Buyer Requirement
250 kg

Target Price
₹40 – ₹45 / kg

Distance
12 km
04 — Community & Direct Negotiation

A dedicated agricultural community layer helps producers and buyers exchange information beyond individual transactions.

Community categories
Price & Mandi Trends
Logistics & Pooling
Buyer Direct Contracts
Farming & Crop Care
Direct negotiation

Users can communicate directly with each other through trade-focused conversations.

Example negotiation actions:

[ Confirm ₹48/kg ]

[ Share GPS Location ]

[ Discuss Quantity ]

[ Lock In Deal ]

Once a deal is confirmed, LinkHarvest records:

Agreed quantity
Final rate
Delivery date
Trade status
05 — Vernacular Voice Assistant

Digital agriculture shouldn't depend on typing ability.

LinkHarvest supports English and Malayalam voice-based listing creation.

A producer can speak naturally and the system extracts structured information such as:

Voice Input
     ↓
Crop
     ↓
Quantity
     ↓
Expected Harvest Date
     ↓
Target Price
     ↓
Structured Listing

This reduces friction for users who may find conventional digital forms difficult.

06 — Offline-First Architecture

Agricultural environments cannot always rely on stable connectivity.

LinkHarvest is designed around an offline-first workflow.

Network simulator

The application can simulate:

ONLINE
  ↓
Create Listing
  ↓
Sync Immediately

or:

OFFLINE
  ↓
Create Listing
  ↓
Local Sync Queue
  ↓
Network Restored
  ↓
Automatic Synchronization

This makes the product more practical for low-connectivity environments.

07 — Shared Logistics & Cold Chain

A successful trade doesn't end at matching.

The product also considers movement.

LinkHarvest supports shared logistics concepts such as:

Route pooling
Load pooling
Multiple farm pickups
Mini-truck coordination
Cold-chain monitoring

Example trip telemetry:

REEFER TEMPERATURE
4.2°C

TRUCK CAPACITY
78%

ROUTE
Farm A
  ↓
Farm B
  ↓
Farm C
  ↓
Buyer
08 — Geospatial Harvest Heatmap

A regional view of supply and demand.

The heatmap can surface clusters such as:

Nedumangad
     ↓
Kattappana
     ↓
Neyyattinkara

with information such as:

Regional tonnage
Active producer collectives
Demand concentration
Price momentum
Supply clusters
Price momentum
↑ Rising
→ Stable
↓ Dropping

This creates a regional market intelligence layer instead of treating every transaction independently.

09 — Authentication & Persona Management

LinkHarvest supports two user personas:

Producer ↔ Commercial Buyer

Authentication includes:

Mobile + OTP
Kisan ID / password
Producer registration
Buyer registration
Demo profiles
Account switching
Secure logout

Users can switch between available product roles without rebuilding their session.

06 // Screenshots

The screenshots below showcase the core product journey rather than every individual screen.

Product Overview
<p align="center"> <img src="assets/hero.png" width="85%" alt="LinkHarvest Overview"> </p>
Producer Dashboard
<p align="center"> <img src="assets/producer-dashboard.png" width="85%" alt="Producer Dashboard"> </p>

The producer sees market opportunities instead of just inventory.

Buyer Demand → HarvestMatch
<p align="center"> <img src="assets/harvest-match.png" width="85%" alt="HarvestMatch"> </p>

A buyer creates demand and the matching engine surfaces suitable producers.

Match Breakdown
<p align="center"> <img src="assets/match-breakdown.png" width="85%" alt="HarvestMatch Score Breakdown"> </p>

Every match is transparent and explainable.

Negotiation & Deal Lock
<p align="center"> <img src="assets/chat.png" width="85%" alt="Negotiation"> </p>

Direct communication keeps the transaction inside the platform.

Voice & Vernacular Access
<p align="center"> <img src="assets/voice.png" width="85%" alt="Voice Assistant"> </p>

English + Malayalam voice interaction helps reduce digital barriers.

Logistics & Regional Intelligence
<p align="center"> <img src="assets/logistics.png" width="85%" alt="Logistics and Regional Intelligence"> </p>

The system extends beyond discovery into logistics and regional supply intelligence.

07 // Demo Video
Product walkthrough

Maximum duration: 2 minutes

The demo is designed around one complete journey:

Problem
   ↓
Buyer creates demand
   ↓
HarvestMatch finds producers
   ↓
Producer discovers opportunity
   ↓
Users negotiate
   ↓
Deal gets locked
Demo

Coming soon

[ Add YouTube / Drive demo link here ]

08 // APK Download

The production APK will be published through GitHub Releases.

Download

Coming soon

[ Add GitHub Release link here ]

09 // Tech Stack
Mobile / Frontend
React Native
Expo
TypeScript
Expo Router
Backend
Supabase
PostgreSQL
Supabase Authentication
Supabase REST
Supabase Realtime
Supabase Storage
Local / Offline
Local persistence
Offline sync queue
Network state handling
Matching
Deterministic rule-based scoring engine
Explainable weighted matching
Crop / quality compatibility
Price compatibility
Geospatial proximity
Quantity alignment
Development
Visual Studio Code
Git
GitHub
Android Studio
Expo
10 // Installation
Clone Repository
git clone https://github.com/devzzafk/AppSprint-2026.git
Navigate to Project
cd AppSprint-2026/LinkHarvest
Install Dependencies
npm install
Environment Variables

Create a .env file:

EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Never commit .env or API secrets to the repository.

Start Development Server
npm start

or:

npx expo start

Then run using:

Android Emulator
        or
Expo Go
11 // Project Structure
LinkHarvest/
│
├── assets/
│   ├── hero.png
│   ├── producer-dashboard.png
│   ├── buyer-dashboard.png
│   ├── harvest-match.png
│   ├── match-breakdown.png
│   ├── chat.png
│   ├── voice.png
│   ├── logistics.png
│   └── heatmap.png
│
├── src/
│   │
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── demand/
│   │   ├── inventory/
│   │   └── ...
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   ├── services/
│   │   └── matching.ts
│   │
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
12 // Key Highlights
Why LinkHarvest is different
01 Demand-first instead of listing-first

Traditional platforms ask:

"What do you want to sell?"

LinkHarvest asks:

"What does the market need?"

02 Explainable matching

Instead of simply saying:

92% Match

LinkHarvest can explain:

Why?

Crop & Quality     33 / 35
Price Parity       23 / 25
Proximity          18 / 20
Quantity           18 / 20
──────────────────────────
Total              92 / 100
03 Two-sided network

The platform is designed around both sides of the transaction.

PRODUCER
   ↕
LINKHARVEST
   ↕
BUYER

The value increases as both supply and demand become more discoverable.

04 Beyond marketplace discovery

LinkHarvest connects the entire journey:

Demand
  ↓
Matching
  ↓
Discovery
  ↓
Negotiation
  ↓
Deal
  ↓
Logistics
05 Designed for real-world constraints

The product considers:

Low connectivity
Vernacular interaction
Local logistics
Regional supply clusters
Price differences
Quantity mismatches

The goal is not simply to digitize a marketplace.

It is to digitize the connection between supply and demand.
13 // Future Improvements

LinkHarvest can evolve into a larger agricultural market infrastructure layer.

Next iterations
Verified buyer identities
Digital contracts
Escrow-based payments
Transport partner integrations
Real-time GPS logistics
Government / mandi data integrations
More Indian languages
Producer cooperative accounts
Demand forecasting
Quality verification
Digital invoices
Transaction analytics
Market price intelligence
Long-term direction
LOCAL PRODUCER
      ↓
LINKHARVEST
      ↓
REGIONAL MARKET
      ↓
NATIONAL MARKET
14 // Impact
Who benefits?
Producers
Discover real buyer demand
Reduce dependency on cold outreach
Find nearby commercial opportunities
Understand market pricing
Improve utilization of available harvest
Commercial Buyers
Discover regional producers
Post precise requirements
Reduce supplier discovery time
Compare suitable producers
Coordinate procurement
Local Communities
Stronger producer-buyer networks
Better visibility of regional supply
Shared logistics opportunities
Reduced friction in local commerce
The intended impact
                    LINKHARVEST
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
       PRODUCER        BUYER         LOGISTICS
          │              │              │
          └──────────────┼──────────────┘
                         ↓
                 BETTER MARKET ACCESS
                         ↓
                 STRONGER LOCAL TRADE
The bigger idea

A farmer shouldn't need to become a digital marketer to find a buyer.

A buyer shouldn't need to search dozens of disconnected sources to find a producer.

LinkHarvest connects both sides around actual demand.

15 // Product Architecture
                    ┌─────────────────────┐
                    │      LINKHARVEST    │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
        PRODUCER            BUYER            COMMUNITY
             │                 │                 │
             ↓                 ↓                 ↓
        Inventory          Demands          Discussions
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                    ┌─────────────────────┐
                    │   HARVESTMATCH      │
                    │     ENGINE          │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │   CONNECTIONS       │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ NEGOTIATION / DEAL  │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ LOGISTICS / TRADE   │
                    └─────────────────────┘
16 // Data Flow
Buyer Requirement
       │
       ├── Crop
       ├── Quality
       ├── Quantity
       ├── Price
       └── Deadline
              │
              ↓
       HarvestMatch Engine
              │
              ├── Crop / Quality
              ├── Price
              ├── Distance
              └── Quantity
              │
              ↓
        Fit Score 0–100
              │
              ↓
       Producer Discovery
              │
              ↓
        Direct Connection
              │
              ↓
         Negotiation
              │
              ↓
          Deal Lock
17 // Responsible Development

LinkHarvest uses a transparent, deterministic matching approach for its core recommendation logic.

The system does not need a black-box model to explain why two parties are considered compatible.

Design principle

If the platform recommends a match, the user should be able to understand why.

The project also follows basic security practices such as:

Environment variables for credentials
Supabase authentication
Database-level access policies
Role-based workflows
No API secrets committed to Git
18 // AI / Development Disclosure

AI-assisted development tools were used during the development process for tasks such as:

Brainstorming
Code assistance
Debugging
Documentation
UI iteration

All submitted functionality is reviewed and understood by the project builder.

No private API keys or credentials are included in the repository.

19 // License

This project is licensed under the MIT License.

20 // AppSprint Solution Challenge 2026

Built during the

AppSprint Solution Challenge 2026

Organized by:

App Development IG · muLearn LBSITW

<p align="center">
Demand → Match → Connect → Trade

LinkHarvest

Don’t search for a market. Let the market find you.

</p> <p align="center">

Live Product •
GitHub

</p>
<p align="center">

Built individually by Devi Chandran S.

</p> ```
