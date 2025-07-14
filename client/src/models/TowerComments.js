
export class towerComment{
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.towerEventId = data.eventId
        this.creator = data.creator
        this.body = data.body
    }
}