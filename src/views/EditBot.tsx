import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de toast
import ErrorMessage from '../components/ErrorMessage';
import { getBotById, updateBot } from '../services/BotService';
import { Bot } from '../types';
import BotForm from '../components/BotForm';
import { FiArrowLeft, FiSave } from 'react-icons/fi'; // Importa el icono de guardar

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined) {
        const bot = await getBotById(+params.id);
        if(!bot) {
            return redirect('/');
        }
        return bot;
    }
}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let error = '';
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if(error.length) {
        return error;
    }

    if(params.id !== undefined) {
        await updateBot(data, +params.id);
        return redirect('/');
    }
}

const availabilityOptions = [
    { name: 'Activo', value: true},
    { name: 'Inactivo', value: false}
];

export default function EditBot() {
    const bot = useLoaderData() as Bot;
    const error = useActionData() as string;

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6'>
                <h2 className='text-2xl md:text-4xl font-black text-stone-500 mb-4 md:mb-0'>Editar Bot</h2>
                <Link
                    to="/"
                    className='bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center'
                >
                    <FiArrowLeft className="text-xl" />
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

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center"
                >
                    <FiSave className="text-xl" /> {/* Agrega el icono de guardar */}
                </button>
            </Form>
        </>
    );
}
