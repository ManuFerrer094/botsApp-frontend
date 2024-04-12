import { Bot } from "../types"

type BotFormProps = {
    bot?: Bot
}

export default function BotForm({bot} : BotFormProps) {
  return (
    <>
        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="name"
            >Nombre Bot:</label>
            <input 
                id="name"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre del Bot"
                name="name"
                defaultValue={bot?.name}
            />
        </div>

        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="price"
            >Precio:</label>
            <input 
                id="price"
                type="number"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Precio Bot. ej. 200, 300"
                name="price"
                defaultValue={bot?.price}
            />
        </div>
    
    </>
  )
}
