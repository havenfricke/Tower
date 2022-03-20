import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {

  async getEventTickets(id) {
    const res = await api.get('/api/events/' + id + '/tickets')
    logger.log(res.data)
    AppState
  }

}
export const ticketsService = new TicketsService()