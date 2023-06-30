import { Inter } from 'next/font/google';
import Image from 'next/image';
import ethBarcelona from '@/public/assets/logo.png';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full min-h-[92vh] bg">
      <Image
        src={ethBarcelona.src}
        alt="ethbarcelona"
        width={400}
        height={400}
      />
    </main>
  );
}
