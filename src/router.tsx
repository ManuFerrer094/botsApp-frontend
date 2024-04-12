import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Bots, { loader as botsLoader, action as updateAvailabilityAction } from './views/Bots'
import NewBot, { action as newBotAction } from './views/NewBot'
import EditBot, { loader as editBotLoader, action as editBotAction } from './views/EditBot'
import { action as deleteBotAction } from './components/BotDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, 
        children: [
            {
                index: true,
                element: <Bots />,
                loader: botsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'bots/nuevo',
                element: <NewBot />,
                action: newBotAction
            },
            {
                path:'bots/:id/editar', // ROA Pattern - Resource-oriented design
                element: <EditBot />,
                loader: editBotLoader,
                action: editBotAction
            }, 
            {
                path:'bots/:id/eliminar',
                action: deleteBotAction
            }
        ],
    }
])