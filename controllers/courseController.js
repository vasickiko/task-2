const Course = require("../models/Course/Course");

const validateSchema = require("../helper/validateSchema");
const { CreateCourse, UpdateCourse } = require("../models/Course/validate");

const getCourses = async (req, res) => {
    const data = await Course.find().populate("academy");
    res.json(data);
};

const getCourse = async (req, res) => {
    const data = await Course.findById(req.params.id).populate("academy");
    res.json(data);
};

const createCourse = async (req, res) => {
    try {
        await validateSchema(req.body, CreateCourse);

        const { title, duration, academyId } = req.body;

        const course = await Course.create({
            title,
            duration,
            academy: academyId
        });

        res.json(course);

    } catch (err) {
        res.status(err.status || 500).json(err.errors || { message: "Server error" });
    }
};

const updateCourse = async (req, res) => {
    try {
        await validateSchema(req.body, UpdateCourse);

        const { title, duration, academyId } = req.body;

        const updated = await Course.findByIdAndUpdate(
            req.params.id,
            {
                title,
                duration,
                academy: academyId
            },
            { new: true }
        );

        res.json(updated);

    } catch (err) {
        res.status(err.status || 500).json(err.errors || { message: "Server error" });
    }
};

const deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
};


module.exports = {
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}