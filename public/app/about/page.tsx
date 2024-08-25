'use client';

import Image from 'next/image';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-200 p-4">
      <div className="flex items-center max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex-shrink-0 p-6">
          <Image src="/logo.png" alt="TaskHunt Logo" width={150} height={150} />
        </div>
        {/* Text Section */}
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-green-800 mb-4">About Us</h1>
          <p className="text-lg text-green-700">
            We care about the world, so let's save it together with TaskHunt!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
