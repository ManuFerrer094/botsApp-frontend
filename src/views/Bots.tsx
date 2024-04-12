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
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Bots</h2>
            <Link
                to="bots/nuevo"
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
            >
                Agregar Bot
            </Link>
        </div>
        <div className="p-2">
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
