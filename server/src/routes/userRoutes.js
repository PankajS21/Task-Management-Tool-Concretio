import express from "express"
import {createTask,deleteTask,getTask, updateTask,updateTaskStatus} from "../controllers/userController.js";

const router=express.Router();

router.get("/",getTask);
router.post("/",createTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);
router.put("/:id/status", updateTaskStatus); 


export default router;