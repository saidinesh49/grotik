import type { Metadata } from 'next';
import { Layout } from '@/components/common';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grotik - Language Learning & Financial Literacy',
  description: 'Learn language skills while mastering financial concepts through interactive lessons and blockchain-based simulations.',
  keywords: ['language learning', 'financial literacy', 'blockchain', 'education', 'fintech'],
  authors: [
    { name: 'Palisetty Sai Dinesh' },
    { name: 'U Rahul Sai' }
  ],
  openGraph: {
    title: 'Grotik - Language Learning & Financial Literacy',
    description: 'Master new languages while learning financial concepts through interactive lessons and simulations.',
    images: ['/grotik_logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
