import { object, string, number, boolean, Output, array } from 'valibot'

export const DraftBotSchema = object({
    name: string(),
    price: number()
})

export const BotSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})
export const BotsSchema = array(BotSchema)
export type Bot = Output<typeof BotSchema>
