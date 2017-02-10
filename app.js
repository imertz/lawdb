import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
// import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import {config} from './config/main'
import {jwtLogin, localLogin} from './config/passport'
import {User} from './models/user'
import {passRoutes} from './router'
import {personModel} from './models/personModel'

mongoose.connect(config.database);





let app = express()
let port = 8000;


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(passport.initialize())

passport.use(jwtLogin);
passport.use(localLogin);





app.use(express.static('public'))

 let personValues = Object.keys(personModel.paths).slice(0,Object.keys(personModel.paths).length-2);
// app.use('api/authors', authorRouter)

app.get('/', (req,res)=>res.send('welcome to my API'))

app.listen(port, ()=>{
  console.log('Gulp is Running on PORT: ' + port + " and " + personValues)
  for (let i in personValues) {
    console.log(personValues[i])
  }})
passRoutes(app)
