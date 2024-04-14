import { FiX, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate, ActionFunctionArgs, useFetcher, redirect } from 'react-router-dom';
import { Bot } from "../types";
import { formatCurrency } from "../utils";
import { deleteBot } from '../services/BotService';
import DeleteModal from '../components/DeleteModal';
import ActionButtons from '../components/ActionButtons';

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

    const truncatedDescription = (description: string, maxLength: number) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    const redirectToInfoPage = () => {
        navigate(`/bots/${bot.id}/info`);
    };

    return (
        <tr className="border-b">
            <td className="p-3 text-sm text-gray-800 text-center">{bot.name}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{formatCurrency(bot.price)}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{truncatedDescription(bot.description, 20)}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{bot.basePersonality}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{bot.formality}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{bot.enthusiasm}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{bot.humor}</td>
            <td className="p-3 text-sm text-gray-800 text-center">{bot.useCaseTemplate}</td>
            <td className="p-3 text-sm text-gray-800 text-center">
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='id'
                        value={bot.id}
                        className="rounded-full p-2 text-xs uppercase font-bold md:w-auto md:rounded-full border border-black-100 hover:cursor-pointer"
                    >
                        {isAvailable ? <FiCheck className="text-green-500 text-xl" /> : <FiX className="text-red-500 text-xl" />}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
            <ActionButtons
                redirectToInfoPage={redirectToInfoPage}
                editUrl={`/bots/${bot.id}/editar`}
                handleDelete={() => setShowDeleteModal(true)}
            />
            </td>
            <DeleteModal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                handleDeleteConfirmation={handleDeleteConfirmation}
            />
        </tr>
    );
}
