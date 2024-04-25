const router = require("express").Router();
const { Project } = require("../models/project");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const { projectName, email } = req.body;
        const existingProject = await Project.findOne({ projectName, email });

        if (existingProject) {
            console.log("Project already exists");
            return res.status(401).send({ message: "Project already exists" });
        }
        const newProject = new Project({ projectName: projectName, email: email });
        await newProject.save();
        res.status(201).send({ message: "Project created successfully" });
    } catch (error) {
        console.error("Project Adding error:", error);
        res.status(500).send({ message: "Project Adding error" });
    }
});


router.get("/", async (req, res) => {
    try {
        const { email } = req.query;
        const projects = await Project.find({ email: email });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send({ message: "Error fetching projects" });
    }
});

router.delete("/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return res.status(404).send({ message: "Project not found or does not belong to the user" });
        }
        await Project.deleteOne({ _id: projectId });
        res.status(200).send({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).send({ message: "Error deleting project" });
    }
});


module.exports = router;





