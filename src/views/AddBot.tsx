import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const AddChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePersonality: '',
    formality: '',
    enthusiasm: '',
    humor: '',
    useCaseTemplate: '',
    status: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csvLine = `${formData.name},"${formData.description}",${formData.basePersonality},${formData.formality},${formData.enthusiasm},${formData.humor},${formData.useCaseTemplate},${formData.status}`;
    
    // Agregar la nueva línea al archivo CSV
    try {
      const response = await fetch('/api/update-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvLine }),
      });
      if (response.ok) {
        navigate('/'); // Redirige a la lista de bots si la solicitud es exitosa
      } else {
        throw new Error('Error al agregar el bot');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
      <h2 className="text-2xl md:text-4xl font-black text-stone-500 mb-4 md:mb-0">Agregar Bot</h2>
      <Link
        to="/chatbots"
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-full p-2 mr-4 flex items-center"
      >
        <FiArrowLeft className="text-xl" />
      </Link>
      <form className="mt-4 md:mt-10" onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default AddChatBot;
