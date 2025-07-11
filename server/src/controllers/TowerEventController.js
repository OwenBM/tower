import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.editTowerEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createTowerEvent(request, response, next) {
        try {
            const TowerEventData = request.body
            const userInfo = request.userInfo
            TowerEventData.creatorId = userInfo.id
            const newTowerEvent = await towerEventService.createTowerEvent(TowerEventData)
            response.send(newTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async getTowerEventById(request, response, next) {
        try {
            const towerEventId = request.params.eventId
            const towerEvent = await towerEventService.getTowerEventById(towerEventId)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }

    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async getAllTowerEvents(request, response, next) {
        try {
            const towerEvents = await towerEventService.getAllTowerEvents()
            response.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async editTowerEvent(request, response, next) {
        try {
            // console.log('can edit event!!');

            const towerEventId = request.params.eventId
            const editedData = request.body
            const userData = request.userInfo
            const editedTowerEvent = await towerEventService.editTowerEvent(towerEventId, editedData, userData)
            response.send(editedTowerEvent)
        } catch (error) {
            next(error)
            console.log('cant edit event!!', error)
        }
    }
    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async cancelEvent(request, response, next) {
        try {
            const towerEventId = request.params.eventId
            const userData = request.userInfo.id
            const canceledEvent = await towerEventService.cancelEvent(towerEventId, userData)
            response.send(canceledEvent)
        } catch (error) {
            next(error)
        }
    }
}