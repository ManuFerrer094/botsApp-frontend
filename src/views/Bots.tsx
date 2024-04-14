import React, { useState } from 'react';
import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getBots, updateBotAvailability } from '../services/BotService';
import BotDetails from './BotDetails';
import { Bot } from '../types';
import { FiPlus, FiList, FiGrid } from 'react-icons/fi';
import BotGridItem from './BotGridItem';
import { Transition } from 'react-transition-group';

export async function loader() {
  const bots = await getBots();
  return bots;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateBotAvailability(+data.id);
  return {};
}

export default function Bots() {
  const data = useLoaderData() as Bot[];
  const [view, setView] = useState<'list' | 'grid'>('grid');

  const toggleView = () => {
    setView(prevView => (prevView === 'list' ? 'grid' : 'list'));
  };

  return (
    <>
      <div className='flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6'>
        <h2 className='text-2xl md:text-4xl font-black text-stone-700 mb-4 md:mb-0'>Bots</h2>
        <div className="flex items-center flex-wrap">
          <Link
            to="bots/nuevo"
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center transition-colors duration-300"
          >
            <FiPlus className="text-xl" />
          </Link>
          <Transition in={true} timeout={300}>
            {(state) => (
              <button
                onClick={toggleView}
                className={`bg-gray-300 hover:bg-gray-400 text-stone-800 font-bold rounded-full p-2 flex items-center transition-colors duration-300 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}
              >
                {view === 'list' ? <FiGrid className="text-xl" /> : <FiList className="text-xl" />}
              </button>
            )}
          </Transition>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        {view === 'list' ? (
          <table className="w-full mt-5 table-auto text-sm">
            <thead className="bg-stone-800 text-white">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Personalidad</th>
                <th className="p-2">Formalidad</th>
                <th className="p-2">Entusiasmo</th>
                <th className="p-2">Humor</th>
                <th className="p-2">Usos</th>
                <th className="p-2">Disponibilidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(bot => (
                <BotDetails
                  key={bot.id}
                  bot={bot}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full mt-5 table-auto text-sm">
            <tbody>
              <tr className="flex flex-wrap">
                {data.map(bot => (
                  <td key={bot.id} className="w-full md:w-1/3 p-3">
                    <BotGridItem
                      bot={bot}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
