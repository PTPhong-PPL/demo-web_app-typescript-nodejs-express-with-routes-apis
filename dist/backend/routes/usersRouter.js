import { Router } from "express";
import { getMemberX } from "../utils/db";
// import { checkPSearchString } from "../middlewares/validator.js";
// import { getProducts } from "../services/dbProducts.js";
const router = Router();
/* log in, send id and pass through
*/
router.get("/login", async (req, res) => {
    const id = req.query.id;
    const pass = req.query.pass;
    const user = getMemberX(id, pass);
    res.status(200).send(user);
});
// export router
export default router;
