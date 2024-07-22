// app/not-found.tsx
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-2xl mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
