import { Bot } from "../types";

type BotFormProps = {
    bot?: Bot
}

export default function BotForm({bot} : BotFormProps) {
  return (
    <>
        <div className="mb-4 md:flex md:items-center">
            <label
                className="text-gray-800 md:w-1/4"
                htmlFor="name"
            >Nombre Bot:</label>
            <input 
                id="name"
                type="text"
                className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                placeholder="Nombre del Bot"
                name="name"
                defaultValue={bot?.name}
            />
        </div>

        <div className="mb-4 md:flex md:items-center">
            <label
                className="text-gray-800 md:w-1/4"
                htmlFor="price"
            >Precio:</label>
            <input 
                id="price"
                type="number"
                className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                placeholder="Precio Bot. ej. 200, 300"
                name="price"
                defaultValue={bot?.price}
            />
        </div>
    </>
  )
}
