import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { towerComment } from "@/models/TowerComments.js"

class TowerCommentService{

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