import { Router } from "express";
import { getProducts } from "../utils/db";
import { checkPSearchString } from "../middlewares/validators";
// import { checkPSearchString } from "../middlewares/validator.js";
// import { getProducts } from "../services/dbProducts.js";
const router = Router();
/* Search product, lấy data trong query của URL: api/product/search?n={...}
* Nếu không cung cấp "n" => n mặc định = "" để search toàn bộ product
*/
router.get("/search", checkPSearchString, async (req, res) => {
    const name = req.query.n;
    const products = await getProducts(name);
    res.status(200).send(products);
});
// export router
export default router;
