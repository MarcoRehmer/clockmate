import React from 'react';

export const metadata = {
    title: 'Clockmate | Login',
    description: 'Your Time Tracking Buddy',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
          <div>Welcome to Clockmate</div>
          {children}
      </>
  );
}
