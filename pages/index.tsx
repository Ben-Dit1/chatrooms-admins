import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex justify-center w-full">
      <p>Welcome to dashboard</p>
    </main>
  );
}
