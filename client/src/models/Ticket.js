import { TowerEvent } from "./TowerEvent.js"

class Ticket{
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.towerEventId = data.eventId
    }
}

export class TicketEvent extends Ticket{
    constructor(data){
        super(data)
        this.towerEvent = new TowerEvent(data.event) 
    }
}

export class TicketProfile extends Ticket{
    constructor(data){
        super(data)
        this.profile = data.profile
    }
}