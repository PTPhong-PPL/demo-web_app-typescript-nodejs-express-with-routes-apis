import { UserService } from "../services/UserService.js";
export class UserController {
    constructor() {
        this.userService = new UserService();
    }
    async memberLogin(req, res) {
        const id = req.query.id;
        const pass = req.query.pass;
        console.log(id);
        console.log(pass);
        const user = await this.userService.getMemberLogin(id, pass);
        console.log(user);
        res.status(200).send(user);
    }
}
