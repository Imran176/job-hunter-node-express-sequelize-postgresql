const express = require("express");

const router = express.Router();

// Import Database
const {
  getAllJobs,
  createJob,
  getSingleJob,
  searchJob,
} = require("../controllers/jobs");

// =============================================================
// =============================================================

router
  .get("/", (req, res) => res.render("index", { layout: "landing" }))
  .get("/jobs", getAllJobs)
  .get("/jobs/search", searchJob)
  .get("/jobs/add", (req, res) => res.render("add"))
  .post("/jobs/add", createJob);

router.route("/jobs/:id").get(getSingleJob);

module.exports = router;
