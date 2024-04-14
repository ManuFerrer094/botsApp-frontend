import React from 'react';
import { FiEdit, FiTrash, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';

interface ActionButtonsProps {
    redirectToInfoPage: () => void;
    editUrl: string;
    handleDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ redirectToInfoPage, editUrl, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <Transition in={true} timeout={300}>
            {(state) => (
                <div
                    className={`flex gap-2 md:mt-0 transition-opacity duration-300 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        onClick={redirectToInfoPage}
                        className='bg-blue-600 hover:bg-blue-800 text-white rounded-full px-3 py-2 flex items-center justify-center transition-colors duration-300'
                    >
                        <FiInfo />
                    </button>
                    <button
                        onClick={() => navigate(editUrl)}
                        className='bg-purple-600 hover:bg-purple-800 text-white rounded-full px-3 py-2 flex items-center justify-center transition-colors duration-300'
                    >
                        <FiEdit />
                    </button>
                    <button
                        onClick={handleDelete}
                        className='bg-red-600 hover:bg-red-800 text-white rounded-full px-3 py-2 flex items-center justify-center transition-colors duration-300'
                    >
                        <FiTrash />
                    </button>
                </div>
            )}
        </Transition>
    );
};

export default ActionButtons;
