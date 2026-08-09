# ERP Base Frontend

This is the frontend application for the ERP Base template, built with React, Vite, TailwindCSS, and Zustand for state management.

## Prerequisites
- Node.js (v18+ recommended)
- ERP Base Backend must be running for authentication and API requests.

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   The `.env.development` file is included in this repository. It contains necessary environment variables for the frontend to operate correctly (like the VITE_ACCESS_TOKEN_KEY). No manual configuration is needed out-of-the-box.

## Running the Project

Start the Vite development server:
```bash
npm run dev
```

The frontend will run on `https://localhost:3000` (or `http://localhost:5173` depending on your Vite config). 

**Important Note on API & WebSockets:**
The frontend uses a Vite Proxy to route all `/api` and `/socket.io` requests to the backend server (expected to be running on port `5000` by default). If your backend is running on a different URL or IP, you must update the `target` URL in `vite.config.js` to match your backend's address.

## Features Included
- **Clean Architecture:** Fully decoupled, modular folder structure.
- **Global State Management:** Zustand stores configured for Auth (`authStore.js`) and WebSockets (`socketStore.js`).
- **Dynamic Routing:** Route-level protection and layout wrappers based on the user's role.
- **Real-Time Data:** Socket.io client pre-configured to automatically connect upon login to track active users.
- **Theming:** Full TailwindCSS integration with a responsive sidebar and layout system.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to catch errors.
- `npm run preview`: Locally preview the production build.
