import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class TowerEventService{
    async cancelTowerEvent(towerEventId) {
        const response = await api.delete(`api/events/${towerEventId}`)
        logger.log('response from delete req', response.data)
        const towerEvent = new TowerEvent(response.data)
        logger.log('towerevent', towerEvent)
        AppState.towerEvent = towerEvent
    }

    async createNewTowerEventForm(towerEventData) {
        logger.log('pre-event data', towerEventData)
        const response = await api.post('api/events', towerEventData)
        logger.log('creating event!', response.data)
        const newtowerEvent = new TowerEvent(response.data)
        return newtowerEvent

        // TODO whe need to class the response.data
        // save it to the appstate
        // return it
    }

    async getTowerEventbyId(towerEventId) {
        AppState.towerEvent = null
        const oldTowerEvent = await api.get(`api/events/${towerEventId}`)
        const newTowerEvent = new TowerEvent(oldTowerEvent.data)
        AppState.towerEvent = newTowerEvent
        logger.log('appstate of event', AppState.towerEvent)
    }

    async getAllTowerEvents() {
    const response = await api.get('/api/events')
        // logger.log(response.data)
    const towerEvents = response.data.map(towerEventData => new TowerEvent(towerEventData))
        AppState.towerEvents = towerEvents
        // logger.log("appstate towerEvent data:", AppState.towerEvent)
    }

    async cancelEvent(towerEventId) {
        // const towerEvent = this.getTowerEventbyId()
        logger.log('cancel button works!', towerEventId)
    }
}

export const towerEventService = new TowerEventService