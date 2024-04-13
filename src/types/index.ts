import { object, string, number, boolean, Output, array } from 'valibot'

export const DraftBotSchema = object({
    name: string(),
    price: number(),
    description: string(),
    basePersonality: string(),
    formality: string(),
    enthusiasm: string(),
    humor: string(),
    useCaseTemplate: string()
});

export const BotSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
    description: string(),
    basePersonality: string(),
    formality: string(),
    enthusiasm: string(),
    humor: string(),
    useCaseTemplate: string()
})
export const BotsSchema = array(BotSchema)
export type Bot = Output<typeof BotSchema>
