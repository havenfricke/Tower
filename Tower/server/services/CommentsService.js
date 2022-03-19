import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {
  async getEventComments(id) {
    const comments = await dbContext.Comments.find({ eventId: id }).populate('creator').populate('event')
    return comments
  }
  async removeComment(id, body) {
    const comment = await dbContext.Comments.findById(id)
    if (comment.creatorId.toString() !== body.userId) {
      throw new Forbidden('Not your comment')
    }
    await dbContext.Comments.findByIdAndDelete(id)
  }
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    await comment.populate('event')
    return comment
  }

}
export const commentsService = new CommentsService()