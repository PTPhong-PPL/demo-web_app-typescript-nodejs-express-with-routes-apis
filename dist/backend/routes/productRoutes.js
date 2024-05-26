import { Router } from "express";
import { getProducts } from "../utils/db.js";
import { checkPSearchString } from "../middlewares/validators.js";
// import { checkPSearchString } from "../middlewares/validator.js";
// import { getProducts } from "../services/dbProducts.js";
const router = Router();
/* Search product, lấy data trong query của URL: api/product/search?n={...}
* "n" = name của products | nếu không cung cấp, n mặc định = "" ==> search toàn bộ product
*/
router.get("/search", checkPSearchString, async (req, res) => {
    const name = req.query.n;
    const products = await getProducts(name);
    res.status(200).send(products);
});
// export router
export { router as productRoutes };
