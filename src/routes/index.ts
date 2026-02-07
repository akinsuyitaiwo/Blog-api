import { Router } from "express";
import routeNotFound from "../middleware/not-found";


const router = Router();



router.use(routeNotFound);

export default router;
