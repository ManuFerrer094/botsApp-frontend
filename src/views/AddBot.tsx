import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const AddChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [formData] = useState({
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
    
    try {
      const response = await fetch('/api/update-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvLine }),
      });
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Error al agregar el bot');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
      <h2 className="text-2xl md:text-4xl font-black text-stone-500 mb-4 md:mb-0">Agregar Bot</h2>
      <BackButton to="/chatbots" />
      <form className="mt-4 md:mt-10" onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default AddChatBot;
