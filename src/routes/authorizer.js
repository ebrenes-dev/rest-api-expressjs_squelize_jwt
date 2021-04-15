import express from 'express';
import JwtUtil from '../utilities/JwtUtil.js';
import {StatusCodes} from 'http-status-codes';

const router = express.Router();

router.post('/token', (req, res) => authenticationHandler(req, res))

function authenticationHandler(req, res)
{
	const credentials = req.body;
	if(credentials.user === "ebrenes" && credentials.password === "password") {
		const token = JwtUtil.generateJWT(credentials);			
		res.header(JwtUtil.AUTH_HEADER,token);
		res.status(StatusCodes.ACCEPTED)
			.json({
				message: 'You got an access token'
			})
    } 
	else {
        res.status(StatusCodes.UNAUTHORIZED)
			.json({ 
				message: 'Not valid credentials'
			})
    }
}

export default router;