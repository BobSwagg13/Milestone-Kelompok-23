import Image from 'next/image';
import { overlock } from '@/app/font';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-100 to-green-300">
      <div className='flex flex-col text-center items-center m-5'>
      <Image
          src="/logo.png"
          width={250}
          height={42}
          className='mt-5'
          alt="TaskHunt Logo"
        />
        <div className={`${overlock.className} p-7 text-2xl gap-3 flex flex-col text-custom-green`}>
        <p>
        TaskHunt is designed with a dual mission in mind—benefiting both society and the environment. We believe that small actions can lead to big changes. By encouraging users to complete tasks like cleaning up their surroundings, TaskHunt rewards them with points that can be redeemed for exciting benefits. Our goal is to create a healthier, cleaner, and more engaged community through positive reinforcement.
        </p>
        <p>
        Beyond just rewarding positive actions, TaskHunt also encourages users to explore and connect with their local surroundings. Whether you're discovering hidden parks, historical landmarks, or community spaces, TaskHunt turns every task into an adventure. Through exploration, you’ll not only contribute to a better environment but also uncover the unique beauty and stories of the places around you. By fostering a sense of discovery and community, TaskHunt helps users build a deeper connection with their city and its environment.
        </p>
        </div>

      </div>
    </div>
  );
};

export default About;
