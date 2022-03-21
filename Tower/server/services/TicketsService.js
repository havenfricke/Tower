import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"

class TicketsService {
  async removeTicket(ticketId, accountId, body) {
    // const eventCap = await eventsService.getEventById(body.event.id)
    // eventCap.capacity++
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (ticket.accountId.toString() !== accountId) {
      throw new Forbidden('Not your ticket to delete')
    }
    await dbContext.Tickets.findByIdAndDelete(ticketId)
  }

  async getEventTickets(query) {
    const eventTickets = await dbContext.Tickets.find(query).populate('event').populate('account')
    return eventTickets.map(mongooseDocument => {
      const eventTickets = mongooseDocument.toJSON()
      return {
        ticketId: eventTickets.id,
        eventId: eventTickets.eventId,
        account: eventTickets.account,
        ...eventTickets.event
      }
    })
  }

  async getAccountTickets(query) {
    const attendeeTend = await dbContext.Tickets.find(query).populate('account').populate('event')
    return attendeeTend.map(mongooseDocument => {
      const attendeeTend = mongooseDocument.toJSON()
      return {
        ticketId: attendeeTend.id,
        accountId: attendeeTend.accountId,
        event: attendeeTend.event,
        ...attendeeTend.account
      }
    })
  }
  async createTicket(ticket) {
    const event = await eventsService.getEventById(ticket.eventId)
    if (event.capacity == 0) {
      throw new BadRequest('Tickets are sold out')
    }
    if (event.capacity > 0) {
      event.capacity = event.capacity ? event.capacity-- : ''
    }



    const newTicket = await dbContext.Tickets.create(ticket)
    await newTicket.populate('event')
    await newTicket.populate('account')
    await newTicket.save()
    return newTicket
  }

}

export const ticketsService = new TicketsService()