import { Bot } from "../types";

type BotFormProps = {
    bot?: Bot
}

export default function BotForm({ bot }: BotFormProps) {
    return (
        <>
            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="name"
                >Nombre:</label>
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
                    className="text-stone-800 md:w-1/4"
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

            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="description"
                >Descripción:</label>
                <input
                    id="description"
                    type="text"
                    className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                    placeholder="Descripción del Bot"
                    name="description"
                    defaultValue={bot?.description}
                />
            </div>

            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="basePersonality"
                >Personalidad:</label>
                <input
                    id="basePersonality"
                    type="text"
                    className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                    placeholder="Personalidad del Bot"
                    name="basePersonality"
                    defaultValue={bot?.basePersonality}
                />
            </div>

            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="formality"
                >Formalidad:</label>
                <input
                    id="formality"
                    type="text"
                    className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                    placeholder="Formalidad del Bot"
                    name="formality"
                    defaultValue={bot?.formality}
                />
            </div>

            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="enthusiasm"
                >Entusiasmo:</label>
                <input
                    id="enthusiasm"
                    type="text"
                    className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                    placeholder="Entusiasmo del Bot"
                    name="enthusiasm"
                    defaultValue={bot?.enthusiasm}
                />
            </div>

            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="humor"
                >Humor:</label>
                <input
                    id="humor"
                    type="text"
                    className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                    placeholder="Humor del Bot"
                    name="humor"
                    defaultValue={bot?.humor}
                />
            </div>

            <div className="mb-4 md:flex md:items-center">
                <label
                    className="text-stone-800 md:w-1/4"
                    htmlFor="useCaseTemplate"
                >Usos:</label>
                <input
                    id="useCaseTemplate"
                    type="text"
                    className="mt-2 md:mt-0 block w-full md:w-3/4 p-3 bg-gray-50"
                    placeholder="Usos"
                    name="useCaseTemplate"
                    defaultValue={bot?.useCaseTemplate}
                />
            </div>
        </>
    )
}
