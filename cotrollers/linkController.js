const { validationResult } = require("express-validator");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");

class linkController {
  async generate(req, res) {
    try {
      const baseURL = config.get("baseURL");
      const { from } = req.body;
      const code = shortid.generate();

      const existing = await Link.findOne({ from });

      if (existing) {
        return res.json({ link: existing });
      }

      const to = baseURL + "/t/" + code;

      const link = new Link({
        code,
        to,
        from,
        owner: req.user.userId,
      });

      await link.save();

      res.status(201).json(link);
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }

  async getLinks(req, res) {
    try {
      const links = await Link.find({ owner: req.user.userId }); ////

      res.json(links);
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }

  async getLink(req, res) {
    try {
      const { id } = req.params;
      const link = await Link.findById(id); ////
      res.json(link);
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }
}

module.exports = new linkController();
