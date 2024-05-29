import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const router = Router();

const userController = new UserController();

/** 
 * log in, send id and pass through query param
 * id=
 * pass=
 */ 
router.get("/api/users/login", async (req, res) => {
    await userController.memberLogin(req, res);
})



// export router
export {router as userRoutes};