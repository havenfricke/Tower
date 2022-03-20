import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getAllEvents(query = {}) {
    const res = await api.get('/api/events', { params: query })
    logger.log('get all events', res.data)
    AppState.tEvents = res.data
  }

  async getEventById(query = {}) {
    const res = await api.get('/api/events/' + { params: query })
    logger.log('get event by id', res.data)
    AppState.activeEvent = res.data
  }
}
export const eventsService = new EventsService()