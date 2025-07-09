import { dbContext } from "../db/DbContext.js"

class TowerEventService {

    async getAllTowerEvents() {
        const towerEvent = await dbContext.TowerEvent.find().populate('creator')
        // console.log('tower event', towerEvent.creator);
        return towerEvent
    }

    async getTowerEventById(towerEventId) {
        try {
            const towerEvent = await dbContext.TowerEvent.findById(towerEventId).populate('creator')
            return towerEvent
        } catch (error) {
            next(error)
        }
    }

    async createTowerEvent(TowerEventData) {
        const TowerEvent = await dbContext.TowerEvent.create(TowerEventData)
        await TowerEvent.populate('creator')
        // await TowerEvent.populate('ticketCount')
        return TowerEvent
    }
}

export const towerEventService = new TowerEventService