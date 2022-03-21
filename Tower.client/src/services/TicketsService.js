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
    logger.log(ticketData)
    const res = await api.post('/api/tickets', ticketData)
    logger.log('creating a ticket', res.data)
    AppState.myTickets = [...AppState.myTickets, res.data]
  }

}
export const ticketsService = new TicketsService()