import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";



export class TicketController extends BaseController{
    constructor(){
        super('/api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
            
        
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            await ticketService.deleteTicket(ticketId, userId)
            response.send('ticket deleted')
        } catch (error) {
            next(error)
        }
    }

    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createTicket(request, response, next){
        try {
            const bigHunkofData = request.body
            const userInfo = request.userInfo
            bigHunkofData.accountId = userInfo.id
            console.log('big hunk of data!!!',bigHunkofData);
            
            const ticket = await ticketService.createTicket(bigHunkofData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}