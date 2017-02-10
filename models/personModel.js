///<reference path="../typings/index.d.ts"/>
import mongoose from 'mongoose'
import { Schema } from 'mongoose'


let personModel = new Schema({
    legalPerson: Boolean,
    firstName: String,
    lastName: {
        type: String,
        uppercase: true,
        required: true
        },
    DT: {
        type: String,
        uppercase: true,
        required: false
        },
    fathersName: String,
    mothersName: String,
    husbandsName: String,
    sex: String,
    AFM: Number,
    DOY: String,
    ADT: String,
    address: String,
    city: String,
    zip: String,
    country: String,
    profession: String,
    email: String,
    telephone: Number,
    organization: { type: "ObjectId", ref: "Person", required: false },
    contactPerson: { type: "ObjectId", ref: "Person", required: false },
    comments: String

})


let Person = mongoose.model('Person', personModel)

export {personModel, Person}