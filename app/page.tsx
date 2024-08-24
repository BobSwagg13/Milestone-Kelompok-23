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
    if (status === 'loading') return; // Avoid redirecting while the session is loading
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // You can render a loading state here
  }

  return (
    <main style={{ height: '100vh' }}>
      <DynamicMapComponent />
    </main>
  );
};

export default Home;
