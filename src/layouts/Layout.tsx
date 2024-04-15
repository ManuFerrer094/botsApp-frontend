import { Outlet } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiGlobe, FiLoader } from 'react-icons/fi';
import { useState } from 'react';

export default function Layout() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <>
      <header className='bg-stone-800'>
        <nav className='mx-auto max-w-6xl py-4 px-6 lg:px-10 xl:px-16 flex flex-wrap justify-between items-center'>
          <h1 className='text-2xl lg:text-3xl font-extrabold text-stone-200 lg:mb-0'>
            <a href="/">BotMinistrator</a>
          </h1>
          <div className="flex flex-wrap md:space-x-4">
            <a href="https://github.com/ManuFerrer094" target="_blank" rel="noopener noreferrer" className="text-stone-700 transition duration-300 hover:text-stone-800">
              <button className="bg-stone-400 hover:bg-stone-200 text-stone-800 rounded-full px-2 py-2 flex items-center lg:ml-0 ml-1 justify-center md:mb-0 transition duration-300">
                <FiGithub />
              </button>
            </a>
            <a href="https://www.linkedin.com/in/manuferrer/" target="_blank" rel="noopener noreferrer" className="text-stone-700 transition duration-300 hover:text-stone-800">
              <button className="bg-stone-400 hover:bg-stone-200 text-stone-800 rounded-full px-2 py-2 flex items-center justify-center lg:ml-0 ml-1 md:mb-0 transition duration-300">
                <FiLinkedin />
              </button>
            </a>
            <a href="https://manuferrer094.github.io/" target="_blank" rel="noopener noreferrer" className="text-stone-700 transition duration-300 hover:text-stone-800">
              <button className="bg-stone-400 hover:bg-stone-200 text-stone-800 rounded-full px-2 py-2 flex items-center justify-center lg:ml-0 ml-1 md:mb-0 transition duration-300">
                <FiGlobe />
              </button>
            </a>
          </div>
        </nav>
      </header>

      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <FiLoader className="text-white animate-spin text-6xl" />
        </div>
      ) : (
        <main className='mt-4 md:mt-6 lg:mt-8 mx-auto max-w-6xl p-4 md:p-6 lg:p-8 bg-white shadow'>
          <Outlet />
        </main>
      )}
    </>
  );
}
