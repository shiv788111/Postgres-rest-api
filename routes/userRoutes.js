import  { Router } from "express";
import { addData, deleteData, getClass, getSingleData, updateData, upSert } from "../controller/user.controller.js";


const router = Router();

//api
router.get("/students", getClass);
router.get("/students/:student_id",getSingleData)
router.post("/students",addData)
router.put("/students/:student_id",updateData)
router.delete("/students/:student_id",deleteData)
router.post("/upSert",upSert)



export default router;
