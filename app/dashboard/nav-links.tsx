'use client';
import {
  MapPinIcon,
  HomeIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  PowerIcon,

} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Map',
    href: '/',
    icon: MapPinIcon,
  },
  { name: 'Rewards', href: '/dashboard/rewards', icon: TrophyIcon },
  {
    name: 'About Us',
    href:'/dashboard/about-us',
    icon: MagnifyingGlassIcon

  },
  {
    name: 'Sign Out',
    href: '/',
    icon: PowerIcon,
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex text-lg text-green-100 font-semibold hover:bg-light-green hover:text-custom-green transition rounded-full gap-2 items-center justify-center px-5 py-3',
              {
                ' text-custom-green bg-light-green': pathname === link.href, // Active state styles
                'text-light-green': pathname !== link.href, // Non-active state text color
              },
            )}
          >
            <LinkIcon className="w-5 sm:w-6" />
            <p className="hidden lg:block ">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
