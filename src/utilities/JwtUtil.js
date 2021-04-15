import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const BEARER_HEADER_INIT = 0;
const BEARER_HEADER_END = 7;

dotenv.config();

export default class JwtUtil
{	
	static SECRET = process.env.JWT_SECRET_SIGN;
	static JWT_HEADER = "Bearer ";
	static AUTH_HEADER = "authorization";
	static EXPIRATION_TIME = 1440*100;

	static generateJWT(credentials)
	{
		const payload = {check:true, user:credentials.user};
		return  jwt.sign(
						payload, 
						this.SECRET, 
						{expiresIn: this.EXPIRATION_TIME}
				);
	}
	 
	static isValidTokenIntoRequestHeader(token)
	{
		return token !=undefined &&
			token !=null &&
			token.includes(this.JWT_HEADER,BEARER_HEADER_INIT);			
	}	

	static getTokenWithOutJwtHeader(token)
	{ 
		return token.substring(BEARER_HEADER_END); 
	}
	
}