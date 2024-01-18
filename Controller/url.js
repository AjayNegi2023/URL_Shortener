const URL = require("../Models/URL");
const shortid = require("shortid");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      message: "Url is Required",
    });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });

  return res.render("home", {
    id: shortID
  })
  // return res.status(201).json({
  //   id: shortID
  // });
}

const handleRefirectURl = async (req, res) => {
  console.log("ShortId" + req.params.shortID)
  const shortId = req.params.shortID;
  try {
    const entry = await URL.findOneAndUpdate({
      shortId: shortId
    }, {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }, {
      new: true
    });
    console.log(entry)
    if (!entry) {
      console.error(`No URL found for shortId: ${shortId}`);
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(`Error redirecting shortId: ${shortId}`, error);
    res.status(500).send("Internal Server Error");
  }
}

const handleGetAnalytics = async (req, res) => {
  const id = req.params.id;
  // if(!id){
  //   return res.status(404).json({message :"Id is required "})
  // }

  const result = await URL.findOne({
    id
  });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  });
}

const handleSSRhomePage = async (req, res) => {
  const allUrls = await URL.find();
  return res.render("home", {
    urls: allUrls
  })
}
module.exports = {
  handleGenerateNewShortURL,
  handleRefirectURl,
  handleGetAnalytics,
  handleSSRhomePage
};