import {Router} from 'express';

import TaskController from '../controllers/taskController.js'

const router = Router();

//api/task/
router.post('/create', TaskController.createTask);

router.get('/findAll', TaskController.getTasks);

router.get('/findByProject/:projectId', TaskController.getTasksByProject);

router.get('/getOne/:id', TaskController.getTask);

router.delete('/delete/:id', TaskController.deleteTask);

router.put('/update/:id', TaskController.updateTask);

export default router;