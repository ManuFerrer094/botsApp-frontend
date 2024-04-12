import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addBot } from '../services/BotService'
import BotForm from '../components/BotForm'

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }
    await addBot(data)
    
    return redirect('/')
}

export default function NewBot() {
    const error = useActionData() as string

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6'>
                <h2 className='text-2xl md:text-4xl font-black text-slate-500 mb-4 md:mb-0'>Registrar Bot</h2>
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
            
                <BotForm />

                <input
                    type="submit"
                    className="mt-4 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Bot"
                />
            </Form>
        
        </>
    )
}
