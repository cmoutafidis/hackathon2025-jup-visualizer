import { PuffLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <main className='min-h-svh flex justify-center items-center'>
      <PuffLoader color='var(--primary)' />
    </main>
  );
};

export default LoadingPage;
