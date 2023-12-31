import rateLimit from "express-rate-limit";
export const rateLimiterMiddleware = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 5 requests per minute
  message: "You have exceeded your 10 requests per minute limit.",
});
