
import Task from '../models/Task.js';

import {StatusCodes} from 'http-status-codes';

const TaskController = {};

TaskController.createTask = 
function createTask(req, res)
{
    const {name, done, projectId} = req.body;
    Task.create({
        name, 
        done, 
        projectId,
    }, {
        fields: ['name','done','projectId']
    }) // Insert a new project into database table
    .then(insertedTask=>{
        res.status(StatusCodes.CREATED).json({
            message: "Created new task",
            data: insertedTask
        });
    })
    .catch(error=>errorHandler(error,res));
}

TaskController.getTasks =
function getTasks(req,res)
{
    Task.findAll()
    .then(allTasks=>{
        res.status(StatusCodes.OK).json({
            data: allTasks
        });
    })
    .catch(error=>errorHandler(error,res));
}

TaskController.getTask =
function getTask(req,res) 
{
    const {id} = req.params;
    Task.findOne({
        where:{id}
    })
    .then(task=>{
        res
        .status(StatusCodes.OK)
        .json(task);
    })
    .catch(error=>errorHandler(error,res));
}

TaskController.deleteTask =
function deleteTask(req,res){
    const {id} = req.params;
    Task.destroy({
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

TaskController.updateTask =
function updateTask(req,res)
{
    const {id} = req.params;
    const {name, done} = req.body;

    Task.update(
        {name, done},
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

TaskController.getTasksByProject =
function getTasksByProject(req, res)
{
    const {projectId} = req.params;
    Task.findAll({
        where:{
            projectId:projectId //internal JOIN...
        }
    })
    .then(tasks=>{
        res.status(StatusCodes.OK)
            .json(tasks);
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

export default TaskController;