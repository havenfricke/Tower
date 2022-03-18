import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .get('', this.getEvents)
      .get('/:id', this.getEventById)
      .delete('/:id', this.deleteEvent)
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEvents(req, res, next) {
    try {
      const event = await eventsService.getEvents()
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById()
    } catch (error) {
      next(error)
    }
  }
  async deleteEvent(req, res, next) {
    try {
      const event = await eventsService.deleteEvent()
    } catch (error) {
      next(error)
    }
  }
}