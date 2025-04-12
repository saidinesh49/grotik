import type { Metadata } from 'next';
import { Layout } from '@/components/common';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Grotik - Language Learning & Financial Literacy',
  description: 'Learn language skills while mastering financial concepts through interactive lessons and blockchain-based simulations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-gray-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
