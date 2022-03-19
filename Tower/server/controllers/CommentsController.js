import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      //gets for comments are in the events
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
  }
  async createComment(req, res, next) {
    try {
      req.body.eventId = req.params.id
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  deleteComment(req, res, next) {
    try {

    } catch (error) {

    }
  }
}