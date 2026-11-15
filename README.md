<div align="center">

# GKR Portfolio

**A cross-platform portfolio app showcasing my experience, skills, and projects.**

Built with TypeScript, React Native, and Expo — for web, Android, and iOS.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)

</div>

---

## About

GKR Portfolio is a responsive, cross-platform app presenting my professional background and work. It includes sections for my introduction, about, skills, coding activity, projects, experience, and contact information, with light and dark themes.

## Features

- Responsive portfolio experience for web and mobile
- Light and dark themes
- Sections for skills, coding, projects, experience, and contact
- Project cards with technology tags and repository links
- Built with Expo Router and React Native

## Tech stack

- **Language:** TypeScript
- **Framework:** React Native
- **Platform:** Expo SDK 52
- **Navigation:** Expo Router
- **Web support:** React Native Web

## Getting started

### Prerequisites

- Node.js (current LTS version recommended)
- npm
- For native development: Android Studio for Android, or Xcode on macOS for iOS

### Install dependencies

```bash
git clone https://github.com/GagangowdaKR/gkr-portfolio.git
cd gkr-portfolio
npm install
```

### Start the development server

```bash
npm start
```

Then choose a platform from the Expo CLI, or run one of these commands directly:

```bash
npm run web
npm run android
npm run ios
```

For web, `npm run web` starts the app in your browser. Android and iOS runs require the corresponding native development tools.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run web` | Run the app for web |
| `npm run android` | Run the app on Android |
| `npm run ios` | Run the app on iOS |
| `npm run build` | Export the app for production |
| `npm run lint` | Run ESLint |

## Project structure

```text
gkr-portfolio/
├── app/          # App entry point and Expo Router layout
├── assets/       # Images, icons, and other static assets
├── components/   # Portfolio sections and reusable UI
├── constants/    # Shared app constants and theme definitions
├── contexts/     # React context providers
├── services/     # Service modules
├── app.json      # Expo app configuration
├── package.json  # Dependencies and scripts
└── vercel.json   # Web deployment configuration
```

## Deployment

The repository includes Vercel configuration for the web app. To create a production web export:

```bash
npm run build
```

## License

No license is currently specified for this repository.
