import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { localPassport } from "../auth-strategies/localStrategy.js";

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

// testing passport
router.post("/auth/login", localPassport.authenticate("local"), async (req, res) => {
    await userController.authLogin(req, res);
});
router.get("/auth/login/check", (req, res) => {
    if (!req.user)
        return res.status(404).send({msg: "User not found!"});

    return res.status(200).send(req.user);
});
router.post("/auth/logout", async (req, res) => {
    await userController.authLogout(req, res);
});



// export router
export {router as userRoutes};