
export class TowerEvent{
    constructor(data){
        this.capacity = data.capacity
        this.coverImg = data.coverImg
        this.creator = data.creator
        this.description = data.description
        this.id = data.id
        this.isCanceled = data.isCanceled
        this.location = data.location
        this.name = data.name
        this.startDate = new Date(data.startDate).toLocaleDateString()
        this.type = data.type
    }
}