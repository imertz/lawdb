import mongoose from 'mongoose'
import {Schema} from 'mongoose'

const CaseSchema = new Schema({
  description: {
    type: String
  },
  comments: {
    type: String
  },
  numberFolder: {
    type: String
  },
  clients: [{
    contact: { type: "ObjectId", ref: 'Person' },
    role: { type: String, enum: ["ΠΕΛΑΤΗΣ", "ΑΝΤΙΔΙΚΟΣ", "ΔΙΚΗΓΟΡΟΣ", "ΟΜΟΔΙΚΟΣ", "ΑΛΛΟ"], default: "ΠΕΛΑΤΗΣ" }
  }
]},
  {
    timestamps: true
  });


let Case = mongoose.model('Case', CaseSchema);

export {Case};