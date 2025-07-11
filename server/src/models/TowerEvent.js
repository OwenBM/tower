import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {
        // id: { type: Schema.ObjectId, required: true },
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        name: { type: String, min: 3, max: 50, required: true },
        description: { type: String, min: 15, max: 1000, required: true },
        coverImg: { type: String, required: true },
        location: { type: String, min: 1, max: 500, required: true },
        capacity: { type: Number, min: 1, max: 5000, required: true },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, required: true, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
    },
    {
        toJSON: { virtuals: true }
    },
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true,
})

TowerEventSchema.virtual('ticketCount', {
    localField: 'TicketId',
    foreignField: '_id',
    ref: 'Ticket',
    justOne: false
})