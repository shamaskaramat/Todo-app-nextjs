# Next.js Todo App with Firebase Authentication

This project is a simple Todo application built with Next.js and Firebase Authentication. Users can log in with their Google accounts and manage their todo items.

## Features

- Google Authentication using Firebase
- CRUD operations for todos
- Responsive design with Tailwind CSS
- Session persistence
- Form validation

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Firebase (Authentication and Firestore)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js and npm installed
- Firebase project set up with Firestore and Google Authentication enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shamaskaramat/Todo-app-nextjs
   cd your-repo-name

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase environment variables:

   - Create a `.env.local` file in the root of your project.
   - Add your Firebase configuration variables:
     ```env
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

4. Run the development server:
   npm run dev


