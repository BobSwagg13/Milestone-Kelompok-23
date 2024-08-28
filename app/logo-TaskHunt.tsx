import { quicksand } from '@/app/font';
import Image from 'next/image';


export default function TaskHuntLogo() {
    return (
      <div
        className={`${quicksand.className} flex flex-row items-center leading-none text-light-green gap-3`}
      >
        <Image
          src="/logo_ms_3.png"
          width={46}
          height={42}
          className='min-w-8'
          alt="TaskHunt Logo"
        />
        <p className="font-semibold hidden md:block text-4xl">TaskHunt</p>
      </div>
    );
  }
  