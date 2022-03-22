import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {

  async getEventTickets(id) {
    const res = await api.get('/api/events/' + id + '/tickets')
    logger.log('Get tickets for this event', res.data)
    AppState.eTickets = res.data
  }

  async createTicket(ticketData) {
    AppState.activeEvent.capacity--
    const res = await api.post('/api/tickets', ticketData)
    logger.log('creating a ticket', res.data)
    let newTick = res.data
    AppState.eTickets.push(newTick)

  }

  async getMyTickets() {
    const res = await api.get('/account/tickets')
    logger.log('get my tickets', res.data)
    AppState.myTickets = res.data
  }

  async deleteTicket(id) {
    AppState.activeEvent.capacity++
    const res = await api.delete('/api/tickets/' + id)
    logger.log('delete ticket', res.data)
    AppState.myTickets = AppState.myTickets.filter(t => t.ticketId !== id)

  }
}
export const ticketsService = new TicketsService()