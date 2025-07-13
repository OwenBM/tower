import { TicketEvent, TicketProfile } from "@/models/Ticket.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class TicketService{
  async getTicketsByAccount() {
    const response = await api.get('account/tickets')
    logger.log("response!",response)
    const tickets = response.data.map(oldTicket => new TicketEvent(oldTicket))
    AppState.ticketEvents = tickets
  }
  async getTicketsbyEventId(towerEventId) {
    AppState.ticketProfiles =[]
    const response = await api.get(`/api/events/${towerEventId}/tickets`)
    logger.log('ticket havers?:', response.data)
    const ticket = response.data.map(ticket => new TicketProfile(ticket))
    AppState.ticketProfiles= ticket
    // logger.log('appstate of tickets', AppState.tickets)
  }


  async buyTicket(towerEventId) {
    const response = await api.post('/api/tickets', towerEventId)
    const newTicket = new TicketProfile(response.data)
    logger.log('ticket: ', newTicket)
    AppState.ticketProfiles.push(newTicket)
    logger.log('ticket bought(?)')
  }

}

export const ticketService = new TicketService()