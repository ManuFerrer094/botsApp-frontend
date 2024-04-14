import React from 'react';
import ReactModal from 'react-modal';

interface DeleteModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    handleDeleteConfirmation: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onRequestClose, handleDeleteConfirmation }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmar Eliminación"
            className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
        >
            <div className="bg-white w-full md:w-1/2 p-4 md:p-8 rounded-lg shadow-lg">
                <h2 className="text-lg md:text-xl font-bold mb-4">¿Estás seguro de que quieres eliminar este bot?</h2>
                <div className="flex justify-center">
                    <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg mr-2" onClick={onRequestClose}>Cancelar</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg" onClick={handleDeleteConfirmation}>Eliminar</button>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteModal;
