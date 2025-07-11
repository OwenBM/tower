import { dbContext } from "../db/DbContext.js"


class TicketService{


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