import express from "express";
import { body } from "express-validator";
import { postSignUp } from "../controllers/auth/post_signup";
import { postLogin } from "../controllers/auth/post_login";
import { postLogOut } from "../controllers/auth/post_logout";
import { resendToken } from "../controllers/auth/get_verify_user";
import { verifyToken } from "../controllers/auth/get_verify_user";
import {
  forgetPassword,
  postChangePassword,
} from "../controllers/auth/post_reset_password";
import { NotFoundError } from "../errors/not-found_error";
import { currentUser } from "../middleware/current_user";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { validateRequest } from "../middleware/validate_request";
import { requireAdmin } from "../middleware/require_admin";
import { isNotLoggedIn } from "../middleware/isNotLoggedIn";
import { rateLimiterMiddleware } from "../middleware/rate-limiter";
const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must be at least 2 character !"),
    body("email").isEmail().notEmpty().withMessage("Email Must Be Valid !"),
    body("password")
      .isString()
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password Must Be Between 6 And 20 Characters !"),
    body("phone")
      .isString()
      .notEmpty()
      .custom((value) => {
        // Remove any non-digit characters
        value = value.replace(/\D/g, "");
        // Check if the country code is +31
        if (value.startsWith("31")) {
          value = value.slice(2);
        }
        // Check if the phone number is 9 digits long
        return value.length === 9;
      })
      .withMessage("Phone must be number from Netherland !"),
  ],
  validateRequest,
  currentUser,
  isNotLoggedIn,
  rateLimiterMiddleware,
  postSignUp
);

router.post(
  "/login",
  [
    body("email").isEmail().notEmpty().withMessage("Email Must Be Valid !"),
    body("password")
      .isString()
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password Must Be Between 6 And 20 Characters !"),
  ],
  validateRequest,
  currentUser,
  isNotLoggedIn,
  rateLimiterMiddleware,
  postLogin
);

router.post(
  "/logout",
  rateLimiterMiddleware,
  currentUser,
  isLoggedIn,
  postLogOut
);
router.get(
  "/currentUser",
  rateLimiterMiddleware,
  currentUser,
  isLoggedIn,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

router.get(
  "/verify/:token",
  rateLimiterMiddleware,
  currentUser,
  isNotLoggedIn,
  verifyToken
);
router.get(
  "/resendToken",
  rateLimiterMiddleware,
  currentUser,
  isNotLoggedIn,
  resendToken
);
router.post(
  "/forgetPassword",
  [body("email").isEmail().notEmpty().withMessage("Email Must Be Valid !")],
  validateRequest,
  rateLimiterMiddleware,
  currentUser,
  isNotLoggedIn,
  forgetPassword
);
router.post(
  "/newpassword",
  [
    body("password")
      .isString()
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password Must Be Between 6 And 20 Characters !"),
    body("token").isString().notEmpty().withMessage("Token Must Be Valid !"),
  ],
  validateRequest,
  rateLimiterMiddleware,
  currentUser,
  isNotLoggedIn,

  postChangePassword
);

router.all("*", async () => {
  throw new NotFoundError();
});

export { router };
