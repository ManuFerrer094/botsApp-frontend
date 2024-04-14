import React, { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { useNavigate, ActionFunctionArgs, useFetcher, redirect } from 'react-router-dom';
import { Bot } from "../types";
import { formatCurrency } from "../utils";
import { deleteBot } from '../services/BotService';
import DeleteModal from '../components/DeleteModal';
import ActionButtons from '../components/ActionButtons';

type BotGridItemProps = {
    bot: Bot
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteBot(+params.id)
        return redirect('/')
    }
}

const BotGridItem: React.FC<BotGridItemProps> = ({ bot }) => {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isAvailable = bot.availability;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteConfirmation = async () => {
        await deleteBot(bot.id);
        setShowDeleteModal(false);
        navigate('/');
    };

    const redirectToInfoPage = () => {
        navigate(`/bots/${bot.id}/info`);
    };

    return (
        <div className="border rounded-lg p-4 md:flex md:flex-col card hover:shadow-md transition duration-300">
            <div className="md:flex md:flex-col md:justify-between">
                <h3 className="text-lg font-semibold">{bot.name}</h3>
                <p className="text-gray-600">{formatCurrency(bot.price)}</p>
                <p className="text-gray-600 md:mt-4">{bot.description}</p>
            </div>
            <div className="flex justify-between md:mt-4">
                <fetcher.Form method='POST' className="w-full md:w-auto">
                    <button
                        type='submit'
                        name='id'
                        value={bot.id}
                        className="rounded-full p-2 text-xs uppercase font-bold md:w-auto md:rounded-full border border-black-100 hover:cursor-pointer"
                    >
                        {isAvailable ? <FiCheck className="text-green-500 text-xl" /> : <FiX className="text-red-500 text-xl" />}
                    </button>
                </fetcher.Form>
                <ActionButtons
                    redirectToInfoPage={redirectToInfoPage}
                    editUrl={`/bots/${bot.id}/editar`}
                    handleDelete={() => setShowDeleteModal(true)}
                />
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                handleDeleteConfirmation={handleDeleteConfirmation}
            />
        </div>
    );
};

export default BotGridItem;
