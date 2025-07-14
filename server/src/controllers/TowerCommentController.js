import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerCommentService } from "../services/TowerCommentService.js";

export class TowerCommentController extends BaseController{
    constructor(){
        super('/api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }
    async deleteComment(request, response, next) {
        const towerCommentId = request.params.commentId
        await towerCommentService.deleteComment(towerCommentId)
        response.send('comment deleted')
    }


    async createComment(request, response, next) {
        try {
            const towerCommentData = request.body
            const userId = request.userInfo.id
            towerCommentData.creatorId = userId
            const towerComment = await towerCommentService.createComment(towerCommentData)
            response.send(towerComment)
            // console.log('heyo!');
            
        } catch (error) {
            next(error)
        }
    }
}