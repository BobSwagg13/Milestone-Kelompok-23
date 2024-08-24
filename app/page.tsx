'use client';

import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicMapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false });

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    };
    checkSession();
  }, [router]);

  return (
    <main style={{ height: '100vh' }}>
      <DynamicMapComponent />
    </main>
  );
};

export default Home;
