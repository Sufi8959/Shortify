import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import shortid from "shortid";

// POST /api/url/shorten
export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    throw new ApiError(400, "Original URL is required");
  }
  const shortUrl = shortid.generate();
  const url = await Url.create({
    originalUrl,
    shortUrl,
    user: req.user._id,
  });
  return res.status(201).json(new ApiResponse(201, url, "Short URL created"));
});

// GET /api/url/myurls
export const getMyUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ user: req.user._id });
  return res.status(200).json(new ApiResponse(200, urls, "User URLs fetched"));
});

// GET /api/url/totalClicks
export const getTotalClicks = asyncHandler(async (req, res) => {
  const urls = await Url.find({ user: req.user._id });
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  return res
    .status(200)
    .json(new ApiResponse(200, { totalClicks }, "Total clicks fetched"));
});

// GET /:shortUrl - redirect to original URL
export const redirectShortUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const urlMapping = await Url.findOne({ shortUrl });
  if (urlMapping) {
    urlMapping.clicks.push({ date: new Date() });
    await urlMapping.save();
    return res.redirect(302, urlMapping.originalUrl);
  } else {
    return res.status(404).send("Short URL not found");
  }
});

// GET /api/url/:shortUrl - return original URL as JSON (for frontend redirect)
export const getOriginalUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const urlMapping = await Url.findOne({ shortUrl });
  if (urlMapping) {
    urlMapping.clicks.push({ date: new Date() });
    await urlMapping.save();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { originalUrl: urlMapping.originalUrl },
          "Original URL fetched"
        )
      );
  } else {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Short URL not found"));
  }
});

export const getClicksPerDay = asyncHandler(async (req, res) => {
  const result = await Url.aggregate([
    { $match: { user: req.user._id } },
    { $unwind: "$clicks" },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$clicks.date" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const formatted = result.map((item) => ({
    clickDate: item._id,
    count: item.count,
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, formatted, "Clicks per day fetched"));
});
