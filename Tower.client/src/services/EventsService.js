import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getAllEvents(query = {}) {
    const res = await api.get('/api/events', { params: query })
    logger.log('get all events', res.data)
    AppState.tEvents = res.data
  }

  async getEventById(id) {
    const res = await api.get('/api/events/' + id)
    logger.log('get event by id', res.data)
    AppState.activeEvent = res.data
  }

  async getConcerts(query = {}) {
    const res = await api.get('/api/events', { params: query })
    logger.log('get all events', res.data)
    let filter = 'CONCERT'
    AppState.tEvents = res.data.filter(e => e.type == filter)
    logger.log(AppState.tEvents)
  }

  async getConventions(query = {}) {
    const res = await api.get('/api/events', { params: query })
    logger.log('get all events', res.data)
    let filter = 'CONVENTION'
    AppState.tEvents = res.data.filter(e => e.type == filter)
    logger.log(AppState.tEvents)
  }

  async getSports(query = {}) {
    const res = await api.get('/api/events', { params: query })
    logger.log('get all events', res.data)
    let filter = 'SPORT'
    AppState.tEvents = res.data.filter(e => e.type == filter)
    logger.log(AppState.tEvents)
  }

  async getDigital(query = {}) {
    const res = await api.get('/api/events', { params: query })
    logger.log('get all events', res.data)
    let filter = 'DIGITAL'
    AppState.tEvents = res.data.filter(e => e.type == filter)
    logger.log(AppState.tEvents)
  }
}
export const eventsService = new EventsService()