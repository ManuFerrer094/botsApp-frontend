import { Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addBot } from '../services/BotService'
import BotForm from '../components/BotForm'
import { FiSave } from 'react-icons/fi'
import BackButton from '../components/BackButton'

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
                <h2 className='text-2xl md:text-4xl font-black text-stone-500 mb-4 md:mb-0'>Registrar Bot</h2>
                <BackButton to="/" />
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-4 md:mt-10"  
                method='POST'
            >
                <BotForm />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center transition duration-300"
                >
                    <FiSave className="text-xl" />
                </button>
            </Form>
        </>
    )
}
