
import Project from '../models/Project.js';

import {StatusCodes} from 'http-status-codes';

export function createProject(req, res)
{
    const {name, priority, description, deliverydate} = req.body;
    Project.create({
        name, 
        priority, 
        description, 
        deliverydate
    }, {
        fields: ['name','priority','description','deliverydate']
    }) // Insert a new project into database table
    .then(insertedProject=>{
        res.status(StatusCodes.CREATED).json({
            message: "Created new project",
            data: insertedProject
        });
    })
    .catch(error=>errorHandler(error,res));
}

export function getProjects(req,res)
{
    Project.findAll()
    .then(allProjects=>{
        res.status(StatusCodes.OK).json({
            data: allProjects
        });
    })
    .catch(error=>errorHandler(error,res));
}

export function getProject(req,res){
    const {id} = req.params;
    Project.findOne({
        where:{id}
    })
    .then(project=>{
        res
        .status(StatusCodes.OK)
        .json(project);
    })
    .catch(error=>errorHandler(error,res));
}

export function deleteProject(req,res){
    const {id} = req.params;
    Project.destroy({
        where:{id}
    })
    .then(affectedRows=>{
        res
        .status(StatusCodes.OK)
        .json({
            message: 'Delete action executed',
            affectedRows: affectedRows
        });
    })
    .catch(error=>errorHandler(error,res));
} 

export function updateProject(req,res)
{
    const {id} = req.params;
    const {name, priority, description, deliverydate} = req.body;

    Project.update(
        { name, priority, description, deliverydate},
        { 
            where: { id: id },
            returning: true, // needed for returning affected rows
        }
        
    )
    .then(affectedRegisters =>{
        res.status(StatusCodes.ACCEPTED).
            json({
                message:"Edit action executed",
                affectedRegisters: affectedRegisters
            });
    })
    .catch(error=>errorHandler(error,res));
}

function errorHandler(error,res)
{
    console.log('Something wrong... '+error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
        message: error.toString()
    });
}