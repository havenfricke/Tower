import { dbContext } from "../db/DbContext"

class CommentsService {
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    await comment.populate('event')
    return comment
  }

}
export const commentsService = new CommentsService()