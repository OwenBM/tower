import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventService{
    async createNewTowerEventForm(towerEventData) {
        const response = await api.post('api/events', towerEventData)
        logger.log('creating event!', response.data)
    }

    async getTowerEventbyId(towerEventId) {
        AppState.TowerEventPage = null
        const oldTowerEvent = await api.get(`api/events/${towerEventId}`)
        AppState.TowerEventPage = oldTowerEvent.data
        logger.log('appstate of event', AppState.TowerEventPage)
    }

    async getAllTowerEvents() {
    const response = await api.get('/api/events')
        // logger.log(response.data)
    const towerEvents = response.data.map(towerEventData => new TowerEvent(towerEventData))
        AppState.towerEvents = towerEvents
        // logger.log("appstate towerEvent data:", AppState.towerEvent)
    }

}

export const towerEventService = new TowerEventService