const Router = require("express");
const { check } = require("express-validator");
const auth = require("../middleware/auth.middleware");

const linkController = require("../cotrollers/linkController");

const router = new Router();

router.post("/generate", auth, linkController.generate);

router.get("/links", auth, linkController.getLinks);

router.get("/links/:id", auth, linkController.getLink);

module.exports = router;
