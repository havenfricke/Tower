import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CommentsSchema } from "../models/Comment";
import { TicketsSchema } from "../models/Ticket";
import { EventsSchema } from "../models/TowerEvent";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  TowerEvents = mongoose.model('Event', EventsSchema)
  Tickets = mongoose.model('Ticket', TicketsSchema)
  Comments = mongoose.model('Comment', CommentsSchema)
}

export const dbContext = new DbContext()
