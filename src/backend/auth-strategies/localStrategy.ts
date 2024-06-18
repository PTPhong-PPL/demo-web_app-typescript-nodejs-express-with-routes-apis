import { Express } from "express";
import passport, { strategies } from "passport";
import { Strategy } from "passport-local";
import { UserService } from "../services/UserService.js";

const userService = new UserService();

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id: string, done) => {
    try {
        const findUser = await userService.getMemberById(id);
        if (findUser.length === 0)
            throw new Error("User not found!");

        const user = {
            id: findUser[0].UserID,
            password: findUser[0].Password
        }

        done(null, user);
    } catch (err) {
        done(err, null);
    }
})

passport.use(
    // new Strategy({ usernameField: "email" }, (username, password, done) => {}) dùng cái này để xác định rõ data field trong req.body
    // ví dụ req.body có 2 field là "email": "..." và "password": "..." thì phải làm như trên để passport biết đường kiếm data

    // "localAuth", sử dụng cái này nếu muốn đặt tên riêng cho strategy, "passport-local" đặt tên mặc định là "local"
    new Strategy(async (username, password, done) => {
        try {
            console.log(username);
            console.log(password);

            const userLogin = await userService.getMemberLogin(username, password);
            if (userLogin.length === 0) 
                throw new Error("User not found!");

            const user = {
                id: userLogin[0].UserID,
                password: userLogin[0].Password
            }

            done(null, user);
        } catch (err) {
            done(err);
        }
    })
);

export default passport;