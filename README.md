# Plan2Go - AI-Powered Travel Planning Platform

A modern React application for AI-based travel recommendations, weather-aware suggestions, and tour guide booking.

## Features

- 🎯 **AI-Based Travel Recommendations** - Get personalized trip plans based on preferences, budget, and location type
- 🌤️ **Weather-Aware Packing Suggestions** - Smart recommendations for what to pack based on weather
- 🗺️ **Nearby Essentials Map** - Find hotels, restaurants, transport, and emergency services
- 👥 **Tour Guide System** - Book verified local guides with reviews and ratings
- 📊 **Tour Monitoring** - Track and manage your active tours
- ⚙️ **Account Management** - Comprehensive settings and profile management

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- JavaScript (ES6+)
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, ProtectedRoute, etc.)
├── context/         # Context providers (AuthContext)
├── pages/           # Page components
│   ├── Landing.js
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── TourPlanning.js
│   ├── TourMonitor.js
│   ├── TourGuides.js
│   └── Maintenance.js
├── App.js           # Main app component with routing
└── index.js         # Entry point
```

## Authentication

- **Public Routes**: Landing, Login, Register (accessible to all)
- **Protected Routes**: All other pages require authentication
- Authentication is handled via Context API with localStorage persistence
- Visitors can only access the landing page and auth pages

## User Types

- **Traveler**: Can plan trips, book guides, monitor tours
- **Tour Guide**: Can post services and manage bookings (future feature)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

