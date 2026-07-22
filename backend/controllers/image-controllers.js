const Project = require("../models/image");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");
const {uploadToCloudinary} = require("../helper/cloudinaryHelper");


// CREATE PROJECT
const uploadProjectController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Project image is required",
            });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }
                
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const newProject = new Project({
            title,
            description,
            Url: url,
            publicId,                // <-- now saved correctly
            uploadedBy: req.userInfo.userId
        });


        await newProject.save();

        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: "Project uploaded successfully",
            project: newProject,
        });

    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


// GET ALL PROJECTS
const fetchProjectsController = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: projects,
        });

    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


// DELETE PROJECT
const deleteProjectController = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // Admin can delete any project, no need to check uploadedBy
    if (project.publicId) {
      await cloudinary.uploader.destroy(project.publicId);
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (e) {
    console.error("Delete error:", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e.message
    });
  }
};

module.exports = {
    uploadProjectController,
    fetchProjectsController,
    deleteProjectController,
};