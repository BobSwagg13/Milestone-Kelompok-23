'use client';

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicMapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false });

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 
    if (!session) {
      router.replace('/auth/signin'); 
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main style={{ height: '100vh' }}>
      <DynamicMapComponent />
    </main>
  );
};

export default Home;
