import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header className='bg-slate-800'>
        <div className='mx-auto max-w-6xl py-4 px-6 lg:px-10 xl:px-16'>
          <h1 className='text-2xl lg:text-4xl font-extrabold text-white'>
            Administrador de Bots
          </h1>
        </div>
      </header>

      <main className='mt-4 md:mt-6 lg:mt-8 mx-auto max-w-6xl p-4 md:p-6 lg:p-8 bg-white shadow'>
        <Outlet />
      </main>
    </>
  );
}
