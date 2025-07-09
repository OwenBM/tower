import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventService{
    async getTowerEventbyId(towerEventId) {
        const oldTowerEvent = await api.get(`api/events/${towerEventId}`)
        const newTowerEvent = oldTowerEvent.data.map(newTowerEvent => new TowerEvent(newTowerEvent))
        AppState.towerEvent = newTowerEvent
    }

    async getAllTowerEvents() {
    const response = await api.get('/api/events')
    logger.log(response.data)
    const towerEvents = response.data.map(towerEventData => new TowerEvent(towerEventData))
    AppState.towerEvent = towerEvents
    }

}

export const towerEventService = new TowerEventService