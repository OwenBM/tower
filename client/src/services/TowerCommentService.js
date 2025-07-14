import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { towerComment } from "@/models/TowerComments.js"

class TowerCommentService{

  async deleteTowerComment(towerCommentId) {
    const response = await api.delete(`api/comments/${towerCommentId}`)
    logger.log('deleted comment!', response.data)
    const towerComments = AppState.towerComments
    const index = towerComments.findIndex(comment => comment.id == towerCommentId)
    towerComments.splice(index, 1)
  }

  async createTowerComment(towerCommentData) {
    logger.log('pre-create comment', towerCommentData)
    const response = await api.post('api/comments', towerCommentData)
    logger.log('comment created', response.data)
    const newTowerComment = new towerComment(response.data)
    AppState.towerComments.push(newTowerComment)
  }
  async getCommentsByEventId(towerEventId) {
    const response = await api.get(`api/events/${towerEventId}/comments`)
    logger.log('comments', response.data)
    AppState.towerComments = response.data.map(pojo => new towerComment(pojo))
  }

}

export const towerCommentService = new TowerCommentService()