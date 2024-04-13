import { useState, useEffect } from 'react';
import { FiArrowLeft, FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Bot } from "../types";
import { formatCurrency } from "../utils";
import { deleteBot, getBotById } from '../services/BotService';
import ReactModal from 'react-modal';
import { Spinner } from 'react-bootstrap';

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
                        console.error("Bot not found.");
                    }
                } catch (error) {
                    console.error("Error fetching bot:", error);
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
        <div className="border rounded-lg p-4 md:flex md:flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
                <h2 className="text-2xl md:text-4xl font-black text-stone-500 mb-4 md:mb-0">{bot.name}</h2>
                <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center"
                >
                    <FiArrowLeft className="text-xl" />
                </Link>
            </div>
            <div className="md:flex md:flex-col md:justify-between">
                <p className="text-gray-600">{formatCurrency(bot.price)}</p>
                <p className="text-gray-600 md:mt-4">{bot.description}</p>
            </div>
            <div className="flex justify-between md:mt-4">
            <button
                    onClick={() => navigate(`/bots/${bot.id}/editar`)}
                    className='bg-purple-600 hover:bg-purple-800 text-white rounded-full px-3 py-2 flex items-center justify-center'
                ><FiEdit /></button>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className='bg-red-600 hover:bg-red-800 text-white rounded-full px-3 py-2 flex items-center justify-center'
                ><FiTrash /></button>
            </div>
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
        </div>
    );
};

export default BotInfoPage;
