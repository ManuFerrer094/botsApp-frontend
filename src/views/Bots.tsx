import { ActionFunctionArgs, Link, useLoaderData} from 'react-router-dom'
import { getBots, updateBotAvailability } from '../services/BotService'
import BotDetails from '../components/BotDetails';
import { Bot } from '../types';

export async function loader() {
  const bots = await getBots()
  return bots
}

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await updateBotAvailability(+data.id)
    return {}
}

export default function Bots() {

  const data = useLoaderData() as Bot[]

  return (
    <>
        <div className='flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6'>
            <h2 className='text-2xl md:text-4xl font-black text-slate-500 mb-4 md:mb-0'>Bots</h2>
            <Link
                to="bots/nuevo"
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded mt-4 md:mt-0"
            >
                Agregar Bot
            </Link>
        </div>
        <div className="overflow-x-auto w-full"> {/* Añadido w-full */}
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Bot</th>
                        <th className="p-2">Precio</th>
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
        </div>
    </>
  )
}
