import express, {json} from 'express'; 
import morgan from 'morgan';
//import errorhandler from 'errorhandler'; 
//error handler (¿?)

//Import routing project modules 
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import authorizer from './routes/authorizer.js';
import authValidator from './routes/authValidator.js';

//Initialize
const app = express();

//For security purposes 
app.disable('x-powered-by'); //OK?

//Middleware
app.use(morgan('dev'));
app.use(json()); //It enables the API for receiving JSON objects into request from client

//routes
app.use('/api/project', authValidator, projectRoutes);
app.use('/api/task', authValidator, taskRoutes);
app.use('/api/authenticate/', authorizer);

export default app;