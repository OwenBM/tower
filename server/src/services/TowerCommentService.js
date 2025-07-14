import { dbContext } from "../db/DbContext.js"

class TowerCommentService{
    async deleteComment(towerCommentId) {
        const towerComment = await dbContext.Comments.findById(towerCommentId)
        await towerComment.deleteOne()
    }

    async createComment(towerCommentData) {
        const towerComment = await dbContext.Comments.create(towerCommentData)
        await towerComment.populate('creator')
        return towerComment
    }

    async getCommentsByEventId(eventId) {
    const towerComment = await dbContext.Comments.find({eventId: eventId}).populate('creator')
    return towerComment
    }

}

export const towerCommentService = new TowerCommentService()