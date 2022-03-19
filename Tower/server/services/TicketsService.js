import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"

class TicketsService {
  async removeTicket(ticketId, accountId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (accountId !== ticket.creatorId) {
      throw new Forbidden('Not your ticket to delete')
    }
    await dbContext.Tickets.findByIdAndDelete(ticketId)
  }

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
        accountId: attendeeTend.accountId,
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