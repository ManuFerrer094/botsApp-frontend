import { FiEdit, FiTrash } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom';
import { Bot } from "../types";
import { formatCurrency } from "../utils";
import { deleteBot } from '../services/BotService';
import ReactModal from 'react-modal';

type BotDetailsProps = {
    bot: Bot
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteBot(+params.id)
        return redirect('/')
    }
}

export default function BotDetails({bot} : BotDetailsProps) {

    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isAvailable = bot.availability;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteConfirmation = async () => {
        await deleteBot(bot.id);
        setShowDeleteModal(false);
        navigate('/');
    };

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {bot.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(bot.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='id'
                        value={bot.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Activo' : 'Inactivo'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center justify-center">
                    <button
                        onClick={() => navigate(`/bots/${bot.id}/editar`)}
                        className='bg-indigo-600 text-white rounded-lg px-3 py-2 flex items-center justify-center'
                    ><FiEdit /></button>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className='bg-red-600 text-white rounded-lg px-3 py-2 flex items-center justify-center'
                    ><FiTrash /></button>
                </div>
            </td>
            <ReactModal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                contentLabel="Confirmar Eliminación"
                className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
                >
                <div className="bg-white w-full md:w-1/2 p-4 md:p-8 rounded-lg shadow-lg">
                    <h2 className="text-lg md:text-xl font-bold mb-4">¿Estás seguro de que quieres eliminar este bot?</h2>
                    <div className="flex justify-center">
                        <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg mr-2" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg" onClick={handleDeleteConfirmation}>Eliminar</button>
                    </div>
                </div>
            </ReactModal>
        </tr> 
    )
}
