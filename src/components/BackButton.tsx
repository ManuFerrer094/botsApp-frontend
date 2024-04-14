import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton: React.FC<{ to: string }> = ({ to }) => {
  return (
    <Link
      to={to}
      className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center"
    >
      <FiArrowLeft className="text-xl" />
    </Link>
  );
};

export default BackButton;
