'use client';

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicMapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false });

const Home: React.FC = () => {
  const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter();

  useEffect(() => {
    // Log session status and data for debugging
    console.log("Session Status:", status);
    console.log("Session Data:", session);

    // Wait for session to load before making decisions
    if (status === 'loading') return;

    // Redirect to sign-in page if unauthenticated
    if (status === 'unauthenticated') {
      console.log("No session found, redirecting to sign in");
      router.replace('/auth/signin'); // Redirect to sign-in page
    }
  }, [session, status, router]);

  // Render loading state while session is being fetched
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main style={{ height: '100vh' }}>
      {status === 'authenticated' ? ( // Only render map if authenticated
        <DynamicMapComponent />
      ) : (
        <p>Please sign in to access the map.</p> // Message for unauthenticated users
      )}
    </main>
  );
};

export default Home;
