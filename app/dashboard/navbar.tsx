import TaskHuntLogo from '@/app/logo-TaskHunt';
import NavLinks from '@/app/dashboard/nav-links';

export default function NavBar() {
  return (
    <main className='bg-yellow-100'>
        <div className='flex px-3 py-7 rounded-3xl m-3 items-center flex-row bg-custom-green'>
          <div className='px-3'><TaskHuntLogo/></div>
          <div className='flex gap-5 ml-auto px-4'>
            <NavLinks/>
          </div>
        </div>
    </main>
  );
}