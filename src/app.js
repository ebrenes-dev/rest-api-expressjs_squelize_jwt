import express, {json} from 'express'; 
import morgan from 'morgan';
import cors from 'cors';
//import errorhandler from 'errorhandler'; 
//error handler (¿?)

//Import routing project modules 
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import authorizer from './routes/authorizer.js';
import authValidator from './routes/authValidator.js';




const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    maxAge:360
  }


//Initialize
const app = express();

//For security purposes 
app.disable('x-powered-by'); //OK?

//Middleware
app.use(morgan('dev'));
app.use(json()); //It enables the API for receiving JSON objects into request from client

//routes
app.use('/api/project', cors(corsOptions), authValidator, projectRoutes);
app.use('/api/task', cors(corsOptions), authValidator, taskRoutes);
app.use('/api/authenticate', cors(corsOptions), authorizer);

export default app;