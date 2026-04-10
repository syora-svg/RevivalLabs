import './globals.css';

export const metadata = {
  title: 'RevivalLabs.ai — AI Voice Receptionists & Automations for Growing Businesses',
  description:
    'Never miss a call or lead again. RevivalLabs.ai deploys intelligent AI Voice Receptionists and Automations that answer every call, qualify leads, book appointments, and run your operations 24/7.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
