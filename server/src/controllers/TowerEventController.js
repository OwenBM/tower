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
}