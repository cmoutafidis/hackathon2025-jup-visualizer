import { Link } from '@/components/ui/link';

const Navbar = () => {
  return (
    <div className='h-16 border shadow-sm flex justify-center items-center gap-2 bg-white w-full fixed'>
      <nav className='container mx-auto flex justify-between items-center gap-2'>
        <Link
          href='/'
          className='text-2xl font-semibold'
        >
          Jup Visualizer
        </Link>
        <Link
          variant='button'
          href='https://dev.jup.ag/'
          target='_blank'
        >
          API Docs
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
