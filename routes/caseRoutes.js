import express from 'express'

let casseRoutes = (Case)=> {
    let casseRouter = express.Router();
    casseRouter.route('/')
        .post((req,res) => {
            let casse = new Case(req.body);
            casse.save();
        
            res.status(201).send(casse)
            
        })
        .get((req,res)=> { 
            let query = {};
            if(req.query.genre) {
                query.firstName = req.query.firstName;
            }
            let populatedCases = [] 
            Case.find().populate({path:"clients", select: "firstName"}).
              exec(function(err, casse){
            
                
                if(err) res.status(500).send(err);
                
                else {
                  populatedCases=casse
                  res.status(200).json(populatedCases)}
              })})
    casseRouter.use('/:casseId', (req,res,next) => {
        Case.findById(req.params.casseId,(err,result)=>{
            if(err) res.status(500).send(err)
            else if(result) {
                res.result=result
                next()
            }
            else
            {
                res.status(404).send('no casse found')
            }
        })})
    
    casseRouter.route('/:casseId')
        .get((req,res)=> res.json(req.casse))
        .put((req,res) => {
            Case.findById(req.params.casseId, (err, casse) => {
                if(err) res.status(500).send(err)
                else
                req.casse.firstName = req.body.description
                req.casse.lastName = req.body.comments 
                req.casse.save(err=>{
                if(err) res.status(500).send(err)
                else res.json(req.casse)
            })
                res.json(req.casse)
            })
        })
        .patch((req,res)=>{
            if(req.body._id) delete req.body._id
            for(let p in req.body) {
                req.casse[p] = req.body[p]
            }
            req.casse.save(err=>{
                if(err) res.status(500).send(err)
                else res.json(req.casse)
            });
        })

    return casseRouter
}

export {casseRoutes};