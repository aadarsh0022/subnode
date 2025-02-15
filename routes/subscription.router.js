import  {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const  subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({title:"Get All Subscriptions"})
});
subscriptionRouter.get("/:id", authorize, getUserSubscriptions);
subscriptionRouter.post("/", authorize, createSubscription);



// subscriptionRouter.put("/:id", (req, res) => {
//     res.send({title:"Update subscription details"})
// });
// subscriptionRouter.delete("/:id", (req, res) => {
//     res.send({title:"Delete subscription"})
// });
// subscriptionRouter.get("/user/:id", (req, res) => {
//     res.send({title:"Get all subscriptions of a user"})
// });
// subscriptionRouter.get("/:id/cancel", (req, res) => {    
//     res.send({title:"Cancel subscription"})
// });
// subscriptionRouter.get("/upcoming-renewals", (req, res) => {    
//     res.send({title:"Get all upcoming renewals"})
// });

export default subscriptionRouter;