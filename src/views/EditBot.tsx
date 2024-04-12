import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { getBotById, updateBot } from '../services/BotService'
import { Bot } from '../types'
import BotForm from '../components/BotForm'

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined) {
        const bot = await getBotById(+params.id)
        if(!bot) {
            return redirect('/')
        }
        return bot
    }
}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    if(params.id !== undefined) {
        await updateBot(data, +params.id)
        return redirect('/')
    }

}

const availabilityOptions = [
    { name: 'Activo', value: true},
    { name: 'Inactivo', value: false}
]

export default function EditBot() {
    const bot = useLoaderData() as Bot
    const error = useActionData() as string

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6'>
                <h2 className='text-2xl md:text-4xl font-black text-slate-500 mb-4 md:mb-0'>Editar Bot</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 mt-4 md:mt-0 md:ml-4'
                >
                    Volver a Bots
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-4 md:mt-10"  
                method='POST'
            >
            
                <BotForm 
                    bot={bot}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={bot?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-4 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        
        </>
    )
}
