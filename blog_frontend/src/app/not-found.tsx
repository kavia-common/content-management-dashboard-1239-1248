import React from "react";

export default function NotFound() {
  return (
    <div className="container py-16">
      <section className="card text-center" role="alert" aria-live="assertive">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">404 – Page Not Found</h1>
          <p className="text-sm text-gray-500">The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </div>
  );
}
