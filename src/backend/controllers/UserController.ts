import { Request, Response } from 'express';
import { UserService } from "../services/UserService.js";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async memberLogin(req: Request, res: Response) {
        const id = req.query.id as string;
        const pass = req.query.pass as string;

        console.log(id);
        console.log(pass);

        const user = await this.userService.getMemberLogin(id, pass);
        console.log(user);
        res.status(200).send(user);
    }

    async authLogin(req: Request, res: Response) {
        return res.status(200).send({msg: "ok"});
    }

    async authLogout(req: Request, res: Response) {
        if (!req.user)
            return res.status(401).send({msg: "You haven't log in!"})

        req.logOut((err) => {
            if (err)
                return res.status(500).send({msg: "Internal server error!"});
            
            return res.status(200).send({msg: "Logged out!"});
        })
    }
}