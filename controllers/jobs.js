const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;

// Import Database
const db = require("../config/db");

// Import Model
const Job = require("../models/Job");

// ================>> Jobs CRUD Functionality <<================
// =============================================================

// @desc   Get all jobs
// @route   GET -> /api/v1/jobs
// access   Public
exports.getAllJobs = async (req, res) => {
  try {
    console.log("\nFetching data from Database...");
    const jobs = await Job.findAll();

    res.render("jobs", { jobs });

    // res.status(200).json({
    //   success: true,
    //   count: jobs.length,
    //   data: jobs,
    // });
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    res.status(500).json({
      success: false,
    });
  }
};

// @desc   Get single job
// @route   GET -> /api/v1/jobs/:id
// access   Public
exports.getSingleJob = async (req, res) => {
  try {
    console.log("\nFetching data from Database...");
    const job = await Job.findByPk(req.params.id);

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    res.status(500).json({
      success: false,
    });
  }
};

// @desc   Search jobs
// @route   GET -> /api/v1/jobs/search
// access   Public
exports.searchJob = async (req, res) => {
  try {
    console.log("\nFetching data from Database...");
    let { term } = req.query;

    term = term.toLowerCase();

    const jobs = await Job.findAll({
      where: { technologies: { [Op.like]: `%${term}%` } },
    });

    res.render("jobs", { jobs });

    // res.status(200).json({
    //   success: true,
    //   data: job,
    // });
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    res.status(500).json({
      success: false,
    });
  }
};

// @desc   Create a job
// @route   POST -> /api/v1/job
// access   Public
exports.createJob = async (req, res) => {
  try {
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    if (!title || !technologies || !budget || !description || !contact_email) {
      errors.push({ message: "*Please fill all the required fields" });
    }

    if (errors.length > 0) {
      res.render("add", {
        errors,
        title,
        technologies,
        budget,
        description,
        contact_email,
      });
    } else {
      console.log("\nCreating a new job in Database...");
      // Make lowercase and remove space after comma
      technologies = technologies.toLowerCase().replace(/, /g, ",");
      const job = await Job.create({
        title,
        technologies,
        budget: `$${budget}`,
        description,
        contact_email,
      });

      const jobs = await Job.findAll();

      res.render("jobs", { jobs });
      // res.status(201).json({
      //   success: true,
      //   message: "Job created in Database",
      // });
    }
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    res.status(500).json({
      success: false,
    });
  }
};
