import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

  async getEventComments(id) {
    const res = await api.get('/api/events/' + id + '/comments ')
    logger.log('get event comments', res.data)
    AppState.comments = res.data
  }

  async createComment(id, body) {
    const res = await api.post('/api/comments', id, body)
    logger.log('post event comment', res.data)
    AppState.comments = [...AppState.comments, res.data]
  }

  async deleteComment(id) {
    const res = await api.delete('api/comments/' + id)
    logger.log(res.data, 'Comment deleted')
    AppState.comments = [...AppState.comments, res.data]
  }
}
export const commentsService = new CommentsService()