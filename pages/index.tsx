import { Inter } from 'next/font/google';
import { OrganizationTable } from '@/components/Organizations/OrganizationTable';
import { useRouter } from 'next/router';
import { useUserData } from '@/recoil/User/UserStoreHooks';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const route = useRouter();
  const { signature } = useUserData();

  useEffect(() => {
    if (!signature) {
      route.push('/login');
    }
  }, [route, signature]);
  return (
    <main className="flex justify-center w-full">
      <p>Welcome to dashboard</p>
    </main>
  );
}
