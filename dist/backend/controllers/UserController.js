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
    async authLogin(req, res) {
        return res.status(200).send({ msg: "ok" });
    }
    async authLogout(req, res) {
        if (!req.user)
            return res.status(401).send({ msg: "You haven't log in!" });
        req.logOut((err) => {
            if (err)
                return res.status(500).send({ msg: "Internal server error!" });
            return res.status(200).send({ msg: "Logged out!" });
        });
    }
}
