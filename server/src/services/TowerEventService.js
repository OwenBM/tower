import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventService {



    async getAllTowerEvents() {
        const towerEvent = await dbContext.TowerEvent.find().populate('creator')
        // console.log('tower event', towerEvent.creator);
        return towerEvent
    }

    async getTowerEventById(towerEventId) {
            const towerEvent = await dbContext.TowerEvent.findById(towerEventId).populate('creator')
        return towerEvent
    }

    async createTowerEvent(TowerEventData) {
        const TowerEvent = await dbContext.TowerEvent.create(TowerEventData)
        await TowerEvent.populate('creator')
        // await TowerEvent.populate('ticketCount')
        return TowerEvent
    }

    async editTowerEvent(towerEventId, editedData, userData) {
        const editedTowerEvent = await this.getTowerEventById(towerEventId)
        if (editedTowerEvent.isCanceled == true) {
            throw new BadRequest('You can edit a canceled event!')
        }
        if (editedTowerEvent.creatorId.toString() !== userData.id) {
            throw new Forbidden(`You, ${userData.nickname}, cannot edit anothers persons event!`)
        } else {
            editedTowerEvent.name = editedData.name ?? editedTowerEvent.name
            editedTowerEvent.description = editedData.description ?? editedTowerEvent.description
            // editedTowerEvent.isCanceled = editedData.isCanceled ?? editedTowerEvent.isCanceled
            await editedTowerEvent.save()
            return editedTowerEvent
        }
        // } else {
        // }
    }

    async cancelEvent(towerEventId, userData) {
        const towerEvent = await this.getTowerEventById(towerEventId)
        if (towerEvent.creatorId.toString() !== userData.id) {
            throw new Forbidden(`You cant cancel someone elses event, ${userData.nickname}`)
        } else {
            towerEvent.isCanceled = !towerEvent.isCanceled
            await towerEvent.save()
            return towerEvent
        }
    }
}

export const towerEventService = new TowerEventService