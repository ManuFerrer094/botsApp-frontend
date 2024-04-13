import { safeParse, coerce, number, parse } from 'valibot';
import axios from 'axios';
import { DraftBotSchema, BotsSchema, Bot, BotSchema } from "../types";
import { toBoolean } from '../utils';

type BotData = {
    [k: string]: FormDataEntryValue;
}

export async function addBot(data: BotData) {
    try {
        const result = safeParse(DraftBotSchema, {
            name: data.name,
            price: +data.price,
            description: data.description,
            basePersonality: data.basePersonality,
            formality: data.formality,
            enthusiasm: data.enthusiasm,
            humor: data.humor,
            useCaseTemplate: data.useCaseTemplate
        });
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/bots`;
            await axios.post(url, result.output);
        } else {
            throw new Error('Datos no válidos');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBots() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/bots`;
        const { data } = await axios(url);
        const result = safeParse(BotsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Hubo un error...');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBotById(id: Bot['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/bots/${id}`;
        const { data } = await axios(url);
        const result = safeParse(BotSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Hubo un error...');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateBot(data: BotData, id: Bot['id']) {
    try {
        const NumberSchema = coerce(number(), Number);

        const result = safeParse(BotSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString()),
            description: data.description,
            basePersonality: data.basePersonality,
            formality: data.formality,
            enthusiasm: data.enthusiasm,
            humor: data.humor,
            useCaseTemplate: data.useCaseTemplate
        });
       
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/bots/${id}`;
            await axios.put(url, result.output);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteBot(id: Bot['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/bots/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}

export async function updateBotAvailability(id: Bot['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/bots/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
    }
}
