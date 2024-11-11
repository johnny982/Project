var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')
// telling router that i have this model
let Incident = require('../model/incident');
const incident = require('../model/incident');
let incidentController = require('../controllers/incident.js')
/* get route for the incident list - Read Operation */
// GET, POST, PUT (Edit/Update)

/* Read Operation --> get route for displaying the incidents list */

router.get('/',async(req,res,next)=>{
try{
    const IncidentList = await Incident.find();
    res.render('Incident/list',{
        title:'Incidents',
        IncidentList:IncidentList
    })}
    catch(err){
        console.error(err);
        res.render('Incident/list',{
            error:'Error on server'
        })
    }
    });

/* Create Operation --> get route for displaying the add page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Incident/add',{
            title: "Add Incident"
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Incident/list',{
            error:'Error on server'
        })
    }
});
/* Create Operation --> post route for processing the add page */
router.post('/add',async(req,res,next)=>{
    try{
        let newIncident = Incident({
            "Name":req.body.Name,
            "Time":req.body.Time,
            "Location":req.body.Location,
            "Description":req.body.Description,
        })
        Incident.create(newIncident).then(()=>{
            res.redirect('/incidentslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Incident/list',{
            error:'Error on server'
        })
    }
});

/* Update Operation --> get route for displaying the edit page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const incidentToEdit = await Incident.findById(id);
        res.render('Incident/edit',
            {
                title:'Edit Incident',
                Incident:incidentToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // keep passing the error
    }
});
/* Update Operation --> post route for processing the edit page */
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedIncident = Incident({
            "_id":id,
            "Name":req.body.Name,
            "Time":req.body.Time,
            "Location":req.body.Location,
            "Description":req.body.Description,
        });
        Incident.findByIdAndUpdate(id,updatedIncident).then(()=>{
            res.redirect('/incidentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Incident/list',{
            error:'Error on server'
    })
}
});

/* Delete Operation --> get route to perform delete operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Incident.deleteOne({_id:id}).then(()=>{
            res.redirect('/incidentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Incident/list',{
            error:'Error on server'
    })
    }
});

    module.exports = router