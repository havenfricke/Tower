import { originAgentCluster } from "helmet";
import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class EventsService {
  async createEvent(body) {
    const towerEvent = await dbContext.TowerEvents.create(body)
    await towerEvent.populate('creator')
    return towerEvent
  }
  async getEvents(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query)
    return towerEvents
  }
  async getEventById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
    if (!towerEvent) {
      throw new BadRequest('invalid car id')
    }
    return towerEvent
  }
  async editEvent(update) {
    const original = await this.getEventById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('You are not the creator of this event')
    }
    if (original.isCanceled == true) {
      throw new Forbidden('Event has been canceled')
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description

    await original.save({ runValidators: true })
    return original
  }
  async cancelEvent(eventId, userId) {
    const original = await dbContext.TowerEvents.findById(eventId)
    if (original.creatorId.toString() !== userId) {
      throw new Forbidden('You are not the creator of this event')
    }

    original.isCanceled = !original.isCanceled
    await original.save()
    return original.isCanceled ? 'Canceled' : 'Event reinstated'
  }

}
export const eventsService = new EventsService()