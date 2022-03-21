import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.removeTicket)
  }
  async removeTicket(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const ticketId = req.params.id
      await ticketsService.removeTicket(ticketId, accountId, req.body)
      res.send('Deleted ticket')
    } catch (error) {
      next(error)
    }
  }
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

}