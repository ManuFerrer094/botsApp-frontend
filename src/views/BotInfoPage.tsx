import { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { Bot } from "../types";
import { formatCurrency } from "../utils";
import { deleteBot, getBotById } from '../services/BotService';
import { Spinner } from 'react-bootstrap';
import DeleteModal from '../components/DeleteModal';
import { Transition } from 'react-transition-group';
import BackButton from '../components/BackButton';

const BotInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [bot, setBot] = useState<Bot | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchBot = async () => {
                try {
                    const fetchedBot = await getBotById(parseInt(id));
                    if (fetchedBot) {
                        setBot(fetchedBot);
                    } else {
                        console.error("Bot no encontrado.");
                    }
                } catch (error) {
                    console.error("Error al obtener el bot:", error);
                }
            };
            fetchBot();
        }
    }, [id]);

    const handleDeleteConfirmation = async () => {
        if (id && bot) {
            await deleteBot(parseInt(id));
            setShowDeleteModal(false);
            navigate('/');
        }
    };

    if (!bot) return <Spinner animation="border" variant="primary" />;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="md:flex md:flex-row md:justify-between mb-8">
                <h2 className="text-3xl font-semibold text-stone-800 mb-4 md:mb-0">{bot.name}</h2>
                <div className="flex md:mt-4">
                    <BackButton to="/" />
                    <Transition in={true} timeout={300}>
                        {(state) => (
                            <button
                                onClick={() => navigate(`/bots/${bot.id}/editar`)}
                                className={`bg-purple-600 hover:bg-purple-800 text-white rounded-full px-3 py-2 flex items-center justify-center mr-4 transition-colors duration-300 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <FiEdit />
                            </button>
                        )}
                    </Transition>
                    <Transition in={true} timeout={300}>
                        {(state) => (
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className={`bg-red-600 hover:bg-red-800 text-white rounded-full px-3 py-2 flex items-center justify-center transition-colors duration-300 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <FiTrash />
                            </button>
                        )}
                    </Transition>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-gray-600">{bot.description}</p>
                </div>
                <div className="mb-8">
                    <table className="table-auto border-collapse w-full">
                        <tbody>
                            <tr>
                                <td className="text-lg font-semibold text-stone-800 border border-gray-300 px-4 py-2">Precio</td>
                                <td className="text-gray-600 border border-gray-300 px-4 py-2">{formatCurrency(bot.price)}</td>
                            </tr>
                            <tr>
                                <td className="text-lg font-semibold text-stone-800 border border-gray-300 px-4 py-2">Personalidad Base</td>
                                <td className="text-gray-600 border border-gray-300 px-4 py-2">{bot.basePersonality}</td>
                            </tr>
                            <tr>
                                <td className="text-lg font-semibold text-stone-800 border border-gray-300 px-4 py-2">Formalidad</td>
                                <td className="text-gray-600 border border-gray-300 px-4 py-2">{bot.formality}</td>
                            </tr>
                            <tr>
                                <td className="text-lg font-semibold text-stone-800 border border-gray-300 px-4 py-2">Entusiasmo</td>
                                <td className="text-gray-600 border border-gray-300 px-4 py-2">{bot.enthusiasm}</td>
                            </tr>
                            <tr>
                                <td className="text-lg font-semibold text-stone-800 border border-gray-300 px-4 py-2">Humor</td>
                                <td className="text-gray-600 border border-gray-300 px-4 py-2">{bot.humor}</td>
                            </tr>
                            <tr>
                                <td className="text-lg font-semibold text-stone-800 border border-gray-300 px-4 py-2">Plantilla de Caso de Uso</td>
                                <td className="text-gray-600 border border-gray-300 px-4 py-2">{bot.useCaseTemplate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                handleDeleteConfirmation={handleDeleteConfirmation}
            />
        </div>
    );
};

export default BotInfoPage;
