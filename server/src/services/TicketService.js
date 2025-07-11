import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TicketService{
    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        await ticket.deleteOne()
        // if (ticket.accountId != userId) {
        //     throw new Forbidden('You cannot delete a ticket that does not belong to you, shame!')
        // }
    }

    async getTicketHaversForEvent(eventId) {
        const ticketHavers = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
        return ticketHavers
    }

async createTicket(ticketData){
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    return ticket
}
async getTicketbyProfileId(userId){
    try {
        const tickets = await dbContext.Tickets.find({accountId: userId}).populate('event')
        return tickets
    } catch (error) {
        // next(error)
    }
}
}

export const ticketService = new TicketService()