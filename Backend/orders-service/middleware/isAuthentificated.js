import 'dotenv/config'
import jwt from 'jsonwebtoken'



const isAuthenticated= (req,res,next)=>{
    const authHeader= req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({'message':'you are not authorized, try login'})
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        req.token=token
        next()
    }catch(error){
        res.status(403).json({"message":'Token is invalid or expired'})
    }
}
export default isAuthenticated