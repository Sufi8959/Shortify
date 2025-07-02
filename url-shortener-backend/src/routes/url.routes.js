import express from "express";
import {
  createShortUrl,
  getMyUrls,
  getTotalClicks,
  redirectShortUrl,
  getOriginalUrl,
  getClicksPerDay,
} from "../controllers/url.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.post("/shorten", authenticate, createShortUrl);
router.get("/myurls", authenticate, getMyUrls);
router.get("/totalClicks", authenticate, getTotalClicks);
router.get("/clicksPerDay", authenticate, getClicksPerDay);

// Public API to get original URL for frontend redirect
router.get("/api/url/:shortUrl", getOriginalUrl);

// Public redirect route
router.get("/:shortUrl", redirectShortUrl);

export default router;
