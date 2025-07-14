import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { TowerEventSchema } from '../models/TowerEvent.js';
import { TicketSchema } from '../models/Ticket.js';
import { TowerCommentSchema } from '../models/TowerComment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvent = mongoose.model('TowerEvent', TowerEventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema)
  Comments = mongoose.model('TowerComment', TowerCommentSchema)
}

export const dbContext = new DbContext()
