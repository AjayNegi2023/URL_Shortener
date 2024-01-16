const express = require("express");
const router = express.Router();
const {
    handleGenerateNewShortURL,
    handleRefirectURl,
    handleGetAnalytics
} = require("../Controller/url");
router.post("/", handleGenerateNewShortURL);
router.get("/:shortID", handleRefirectURl);
router.get("/analytics/:shortID", handleGetAnalytics)

module.exports = router;