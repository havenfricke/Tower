import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:id', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await eventsService.createEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getEvents(req, res, next) {
    try {
      const towerEvents = await eventsService.getEvents(req.query)
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const towerEvent = await eventsService.getEventById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await eventsService.editEvent(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async cancelEvent(req, res, next) {
    try {
      const userId = req.userInfo.id
      const eventId = req.params.id
      const cancelEvent = await eventsService.cancelEvent(eventId, userId)
      return res.send(cancelEvent, 'Canceled')
    } catch (error) {
      next(error)
    }
  }
}