import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Transition } from 'react-transition-group';

const BackButton: React.FC<{ to: string }> = ({ to }) => {
  return (
    <Transition in={true} timeout={300}>
      {(state) => (
        <Link
          to={to}
          className={`bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center transition-colors duration-300 ${
            state === 'entered' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <FiArrowLeft className="text-xl" />
        </Link>
      )}
    </Transition>
  );
};

export default BackButton;
