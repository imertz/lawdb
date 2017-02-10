import express from 'express'
import {personModel} from '../models/personModel'

let personRoutes = (Person) => {
    let personRouter = express.Router();
    personRouter.route('/')
        .post((req, res, next) => {
            let person = new Person(req.body);
            person.save(function (err, saved) {
                if (err) {
                    console.log(req.body);
                    
                    res.status(500).send(err)
                }
                else {
                    res.status(201).send(person)
                }
            });
        })
        .get((req, res) => {
            let query = {};
            if (req.query.firstName || req.query.lastName || req.query.legalPerson) {
                query = req.query;
            }
            Person.find(query, (err, results) => {


                if (err) res.status(500).send(err)
                else res.json(results)
            }
            )
        })
    personRouter.use('/:personId', (req, res, next) => {
        Person.findById(req.params.personId, (err, person) => {
            if (err) res.status(500).send(err)
            else if (person) {
                req.person = person
                console.log(req.person);

                next()
            }
            else {
                res.status(404).send('no person found')
            }
        })
    })

    personRouter.route('/:personId')
        .get((req, res) => res.json(req.person))
        .put((req, res) => {
            let personValues = Object.keys(personModel.paths).slice(0, Object.keys(personModel.paths).length - 2);

            for (let i = 0; i < personValues.length; i++) {
                let value = personValues[i]
                console.log(req.body[value])
                req.person[value] = req.body[value]
            }

            req.person.save(err => {
                if (err) res.status(500).send(err)
                else res.json(req.person)
            })

        })
        .patch((req, res) => {
            if (req.body._id) delete req.body._id
            for (let p in req.body) {
                req.person[p] = req.body[p]
            }
            req.person.save(err => {
                if (err) res.status(500).send(err)
                else res.json(req.person)
            });
        })
        .delete((req, res) => {
            req.person.remove(err => {
                if (err)
                    res.stauts(500).send(err)
                else res.status(204).send("Removed")
            })
        })

    return personRouter
}

export {personRoutes};