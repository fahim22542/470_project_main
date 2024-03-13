import express from "express";
<<<<<<< HEAD
import {login,register} from '../controllers/auth.js'
import {upload} from '../middleware/filemanager.js'
=======
import {login} from '../controllers/auth.js'
>>>>>>> eb81fc81724ecaae7e2d4f6ae937d31c8bdff1c8


const router=express.Router()


router.post('/login',login)
<<<<<<< HEAD
router.post('/register',upload.single('picture'),register)
=======
>>>>>>> eb81fc81724ecaae7e2d4f6ae937d31c8bdff1c8

export default router;

