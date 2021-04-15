import express from 'express';
import jwt from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';
import JwtUtil from '../utilities/JwtUtil.js'; 
const router = express.Router();

router.use((req, res, next) => {
    let token = req.headers[JwtUtil.AUTH_HEADER];
    if (JwtUtil.isValidTokenIntoRequestHeader(token)) {
		token = JwtUtil.getTokenWithOutJwtHeader(token);
		jwt.verify(token, JwtUtil.SECRET, (err, decoded) => {      
			if (err) {
				return res.status(StatusCodes.FORBIDDEN)
						.json({ 
							message: err.toString()
						});  
			} else {
				req.decoded = decoded;    
				next();
			}
		});
    } 
	else {
		res.send({ 
			message: 'Request without token or valid headers'
		});
    }
 });

 export default router;