import React, { useState } from 'react';
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
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-4xl font-black text-slate-500 mb-4 md:mb-0">Agregar Bot</h2>
        <Link
          to="/chatbots"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 mt-4 md:mt-0 md:ml-4"
        >
          Volver a Bots
        </Link>
      </div>

      <form className="mt-4 md:mt-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="description">
            Descripción:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="basePersonality">
            Personalidad base:
          </label>
          <input
            type="text"
            id="basePersonality"
            name="basePersonality"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.basePersonality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="formality">
            Formalidad:
          </label>
          <input
            type="text"
            id="formality"
            name="formality"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.formality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="enthusiasm">
            Entusiasmo:
          </label>
          <input
            type="text"
            id="enthusiasm"
            name="enthusiasm"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.enthusiasm}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="humor">
            Humor:
          </label>
          <input
            type="text"
            id="humor"
            name="humor"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.humor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="useCaseTemplate">
            Template de caso de uso:
          </label>
          <input
            type="text"
            id="useCaseTemplate"
            name="useCaseTemplate"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.useCaseTemplate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="status">
            Estado:
          </label>
          <input
            type="text"
            id="status"
            name="status"
            className="mt-2 block w-full p-3 bg-gray-50"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="submit"
          className="mt-4 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Agregar Bot"
        />
      </form>
    </>
  );
};

export default AddChatBot;
