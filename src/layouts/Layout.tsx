import { Outlet } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';

export default function Layout() {
  return (
    <>
      <header className='bg-stone-800'>
        <nav className='mx-auto max-w-6xl py-4 px-6 lg:px-10 xl:px-16 flex flex-wrap justify-between items-center'>
          <h1 className='text-2xl lg:text-3xl font-extrabold text-stone-200 lg:mb-0'>
            <a href="/">BotMinistrator</a>
          </h1>
          <div className="flex flex-wrap md:space-x-4">
            <a href="https://github.com/ManuFerrer094" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-800 transition-colors duration-300">
              <button className="bg-stone-400 hover:bg-stone-200 text-stone-800 rounded-full px-2 py-2 flex items-center lg:ml-0 ml-1 justify-center md:mb-0">
                <FiGithub />
              </button>
            </a>
            <a href="https://www.linkedin.com/in/manuferrer/" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-800 transition-colors duration-300">
              <button className="bg-stone-400 hover:bg-stone-200 text-stone-800 rounded-full px-2 py-2 flex items-center justify-center lg:ml-0 ml-1 md:mb-0">
                <FiLinkedin />
              </button>
            </a>
            <a href="https://manuferrer094.github.io/" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-800 transition-colors duration-300">
              <button className="bg-stone-400 hover:bg-stone-200 text-stone-800 rounded-full px-2 py-2 flex items-center justify-center lg:ml-0 ml-1 md:mb-0">
                <FiGlobe />
              </button>
            </a>
          </div>
        </nav>
      </header>

      <main className='mt-4 md:mt-6 lg:mt-8 mx-auto max-w-6xl p-4 md:p-6 lg:p-8 bg-white shadow'>
        <Outlet />
      </main>
    </>
  );
}
