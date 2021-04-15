import Sequelize from 'sequelize';
import {sequelize} from '../database/connection.js';

const Task = sequelize.define('tasks',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    projectId: {
        type: Sequelize.INTEGER
    }, 
    done: {
        type: Sequelize.BOOLEAN
    }
},{
    timestamps:false
});

export default Task;