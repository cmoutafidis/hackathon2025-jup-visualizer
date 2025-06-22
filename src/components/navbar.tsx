import { ModeToggle } from '@/components/mode-toggle';
import { Link } from '@/components/ui/link';

const Navbar = () => {
  return (
    <div className='h-16 border-b shadow-sm flex justify-center items-center gap-2 w-full fixed bg-background'>
      <nav className='container mx-auto flex justify-between items-center gap-2'>
        <Link
          href='/'
          className='text-2xl font-semibold'
        >
          Jup Visualizer
        </Link>
        <div className='flex justify-end items-center gap-4'>
          <ModeToggle />
          <Link
            variant='button'
            href='https://dev.jup.ag/'
            target='_blank'
          >
            API Docs
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
