# MaxTrack ⚡

> **A sophisticated daily task management and timeline productivity application with bidirectional Google Calendar synchronization.**

[![Expo SDK](https://img.shields.io/badge/Expo-SDK_57-000020.svg?style=flat-square&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.86.3-61DAFB.svg?style=flat-square&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Expo Router](https://img.shields.io/badge/Expo_Router-v57-black.svg?style=flat-square)](https://docs.expo.dev/router/introduction/)
[![Platform](https://img.shields.io/badge/Platform-Android_%7C_iOS_%7C_Web-brightgreen.svg?style=flat-square)]()

---

## 📖 Overview

**MaxTrack** is an elegant mobile application engineered to streamline daily routines and task scheduling. Built on top of **React Native** and **Expo SDK 57**, it bridges local task workflows with **Google Calendar**, providing an integrated timeline of your day.

Whether tracking daily work deliverables, scheduling personal habits, or reviewing monthly productivity trends, MaxTrack delivers a fluid experience with tactile haptic responses, glassmorphic UI cards, smooth spring animations, and native device notifications.

---

## ✨ Key Features

### 📅 Real-Time Google Calendar Synchronization
- **OAuth 2.0 Integration**: Sign in with Google using `@react-native-google-signin/google-signin` with silent background token refresh.
- **Bi-Directional Event Sync**: Automatically fetch upcoming calendar events into your daily dashboard and push newly created tasks directly to your primary Google Calendar.

### ⏱️ Smart Task & Activity Management
- **Detailed Task Metadata**: Set title, description, scheduled date, start time, end time, priority (`High`, `Medium`, `Low`), and category chips (`Work`, `Personal`, etc.).
- **Subtasks & Nested Checklists**: Break down complex tasks into subtasks; completing all subtasks automatically updates the parent task status.
- **Time-Gated Completion**: Tasks cannot be marked completed ahead of their scheduled time, ensuring authentic accountability.
- **Completion Lock & Dialog Confirmation**: Confirmation prompts prevent accidental completions and lock completed activities.

### 📊 Dynamic Dashboard & Activity Metrics
- **Personalized Greeting**: Context-aware greetings with your Google profile name and avatar.
- **Visual Progress Bar**: Real-time progress metric factoring in both top-level tasks and individual subtasks.
- **Categorized Views**: Filter tasks effortlessly into **All Activities**, **Pending** (past due time), **Completed**, and **Upcoming**.
- **Activity History (Explore)**: Segmented overview grouped by *Today's Activities*, *Upcoming Activities*, and *Past History*.

### 🗓️ Gesture-Driven Interactive Calendar
- **Monthly Overview**: Month-by-month calendar with event indicator dots for active days.
- **Fluid Gestures**: Horizontal swipe gestures powered by `react-native-gesture-handler` and `react-native-reanimated` to navigate months smoothly.
- **Day-by-Day Agenda**: Tap any date to inspect scheduled events and edit tasks on the fly.

### 🔔 Custom Notifications & Reminders
- **Precise Notification Scheduling**: Configured with `expo-notifications` and Android high-importance notification channels.
- **Flexible Reminder Offsets**: Set alerts for `At Time`, `5m Before`, `10m Before`, `1h Before`, or specify custom minute intervals.
- **Notification Center**: Dedicated screen to view all active upcoming reminders with global toggle controls.

### 🎨 Adaptive Design System & Micro-Interactions
- **Dual Theme Support**: Beautiful Dark Mode and Light Mode with seamless switching via React Context.
- **Glassmorphism & Gradients**: Subtle glass overlays (`expo-blur`), dynamic accent glow shadows, and linear gradients.
- **Tactile Feedback**: Haptic vibrations on interactions using `expo-haptics`.

---

## 🛠️ Tech Stack & Libraries

| Category | Technology |
|---|---|
| **Core Framework** | [React Native 0.86.3](https://reactnative.dev) & [React 19.2.3](https://react.dev) |
| **Tooling & Platform** | [Expo SDK 57](https://expo.dev) |
| **Routing & Navigation** | [Expo Router v57](https://docs.expo.dev/router/introduction/) (File-based typed routes) |
| **Language** | [TypeScript 6.0](https://www.typescriptlang.org/) |
| **State Management** | React Context API (`AuthContext`, `TaskContext`, `ThemeContext`) |
| **Local Storage** | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) & [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) |
| **Authentication & APIs** | [@react-native-google-signin/google-signin](https://react-native-google-signin.github.io/docs/intro), Google Calendar API v3, [axios](https://axios-http.com/) |
| **Animations & Gestures** | [react-native-reanimated 4.5](https://docs.swmansion.com/react-native-reanimated/), [react-native-gesture-handler 2.32](https://docs.swmansion.com/react-native-gesture-handler/) |
| **Notifications & System** | [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/), [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/), [expo-device](https://docs.expo.dev/versions/latest/sdk/device/) |
| **Icons & Typography** | [@expo/vector-icons](https://icons.expo.fyi/) (Ionicons), Google Fonts (Roboto, Nunito, Inter, League Spartan) |

---

## 📁 Project Directory Structure

```text
myApp/
├── android/                 # Native Android project configuration & build files
├── app/                     # Expo Router navigation routes (pages)
│   ├── (tabs)/              # Main bottom tab navigator
│   │   ├── _layout.tsx      # Tab bar styling & Floating Action Button (FAB)
│   │   ├── index.tsx        # Dashboard / Home Screen
│   │   ├── calendar.tsx     # Monthly Calendar & Agenda
│   │   ├── create.tsx       # Tab FAB navigation anchor
│   │   ├── explore.tsx      # Activity Overview & History
│   │   └── settings.tsx     # User Preferences & Account Settings
│   ├── _layout.tsx          # Root layout, theme, and font providers
│   ├── task-entry.tsx       # Advanced Task Creation & Editing route
│   ├── onboarding.tsx       # Welcome & Google Sign-In onboarding route
│   ├── notifications.tsx    # Scheduled Reminders & Alerts center
│   ├── about.tsx            # App information & mission statement
│   └── privacy-security.tsx # Privacy policies & local data storage details
├── src/
│   ├── assets/              # App icons, splash images, and onboarding graphics
│   ├── components/
│   │   ├── common/          # Reusable UI components (GlassCard, ScalePressable, RevealUp, etc.)
│   │   └── specific/        # Domain-specific components (GoogleLogin, AddTaskModal, Widget)
│   ├── constants/           # theme.ts (Colors, Spacing, Typography, Shadows, Animations)
│   ├── context/             # React Context Providers (AuthContext, TaskContext, ThemeContext)
│   ├── hooks/               # Custom hooks (use-color-scheme, use-theme-color)
│   ├── screens/             # Screen implementations for Dashboard, Auth, and Profile
│   └── services/            # GoogleCalendarService.ts & NotificationService.ts
├── app.json                 # Expo configuration & permission declarations
├── package.json             # Project dependencies and executable npm scripts
└── tsconfig.json            # TypeScript configuration and path aliases (@/*)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm** or **yarn**
- **Expo Go** app on your physical device, OR an Android Studio / iOS Simulator setup.

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd TO-DO/myApp
npm install
```

### 2. Google OAuth Configuration

The app uses `@react-native-google-signin/google-signin` configured with a Web Client ID from `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create an **OAuth 2.0 Client ID**:
   - **Web Application Client ID**: Used for requesting offline access and token exchange.
   - **Android Client ID**: Configure with your package name (`com.maxpinetechnology.maxtrack`) and your local debug/release keystore **SHA-1 fingerprint**.
3. Enable the **Google Calendar API** in your Google Cloud project.
4. Set `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` in `.env` to your project's Web Client ID. `.env` is ignored by Git.

Expo embeds `EXPO_PUBLIC_` values in the app bundle, so this client ID is public configuration, not a private secret. Never put private keys, client secrets, or other server credentials in an `EXPO_PUBLIC_` variable.

### 3. Run the Development Server

Start the Expo development server:

```bash
npm start
# or
npx expo start
```

From the terminal interface:
- Press `a` to open on an connected **Android device / emulator**.
- Press `i` to open on an **iOS simulator** (macOS required).
- Press `w` to open in your **Web browser**.
- Scan the QR code using the **Expo Go** application on Android.

---

## 📱 Available Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `expo start` | Starts the Expo development server with interactive Metro options. |
| `android` | `expo run:android` | Builds and boots the native Android development client locally. |
| `ios` | `expo run:ios` | Builds and boots the native iOS development client locally. |
| `web` | `expo start --web` | Starts the app in a web browser environment. |
| `lint` | `expo lint` | Analyzes code for syntax and styling compliance using ESLint. |

---

## 🔐 Permissions & Privacy

MaxTrack requests minimal permissions necessary for productivity features:
- **`SCHEDULE_EXACT_ALARM` & `VIBRATE`**: Required on Android to deliver accurate time-based task reminders.
- **Google Calendar Scope (`.../auth/calendar`)**: Used solely to sync your events between Google Calendar and your local timeline. Your credentials and calendar data remain stored directly on your device.

---

## 📄 License

Private repository. Copyright © 2026 **MaxTrack Inc.** All rights reserved.
