import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { eventsService } from "./EventsService"

class TicketsService {

  async getEventTickets(query) {
    const eventTickets = await dbContext.Tickets.find(query).populate('event')
    return eventTickets.map(mongooseDocument => {
      const eventTickets = mongooseDocument.toJSON()
      return {
        ticketId: eventTickets.id,
        eventId: eventTickets.eventId,
        ...eventTickets.event
      }
    })
  }

  async getAccountTickets(query) {
    const attendeeTend = await dbContext.Tickets.find(query).populate('account', 'name picture')
    return attendeeTend.map(mongooseDocument => {
      const attendeeTend = mongooseDocument.toJSON()
      return {
        ticketId: attendeeTend.id,
        ...attendeeTend.account
      }
    })
  }
  async createOrUpdate(ticket) {
    const event = await eventsService.getEventById(ticket.eventId)
    if (event.capacity == 0) {
      throw new BadRequest('Tickets are sold out')
    }
    if (event.capacity > 0) {
      event.capacity -= 1
    }
    const newTicket = await dbContext.Tickets.findOneAndUpdate({ eventId: ticket.eventId, accountId: ticket.accountId }, ticket, { upsert: true, new: true })
    await event.save()
    return newTicket
  }

}

export const ticketsService = new TicketsService()