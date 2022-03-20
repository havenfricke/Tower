import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

  async getEventComments(id) {
    const res = await api.get('/api/events/' + id + '/comments ')
    logger.log('get event comments', res.data)
    AppState.comments = res.data
  }

  async createComment(eventId, body) {
    const res = await api.get('/api/events/' + eventId + '/comments', body)
    logger.log('get event comments', res.data)
    AppState.comments = [...AppState.comments, res.data]
  }

}
export const commentsService = new CommentsService()