const express = require("express");
const router = express.Router();
const {
    handleGenerateNewShortURL,
    handleRefirectURl,
    handleGetAnalytics,
    handleSSRhomePage
} = require("../Controller/url");
router.post("/", handleGenerateNewShortURL);
router.get("/:shortID", handleRefirectURl);
router.get("/analytics/:shortID", handleGetAnalytics)
router.get("/all/test",handleSSRhomePage);
module.exports = router;