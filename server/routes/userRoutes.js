import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//     res.send("User route is working");
// });
// userRouter.get("/profile", protectRoute, (req, res) => {
//     console.log(": User profile route is working");
//     res.send("User profile route is working");
// });
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;