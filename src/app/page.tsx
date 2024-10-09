// src/app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Todo App</h1>
      <p className="mt-4 text-lg">
        Please <Link href="/login" className="text-blue-500 underline">login</Link> to manage your tasks.
      </p>
    </main>
  );
}
