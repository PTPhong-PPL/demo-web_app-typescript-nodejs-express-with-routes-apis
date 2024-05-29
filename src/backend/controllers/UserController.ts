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
}