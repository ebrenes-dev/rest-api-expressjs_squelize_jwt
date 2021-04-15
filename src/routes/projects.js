import {Router} from 'express';

import {
        createProject, 
        getProjects, 
        getProject,
        deleteProject,
        updateProject
} from '../controllers/projectController.js';

const router = Router();

//api/project/
router.post('/create', createProject);

router.get('/findAll', getProjects);

router.get('/getOne/:id', getProject);

router.delete('/delete/:id',deleteProject);

router.put('/update/:id',updateProject)

export default router;