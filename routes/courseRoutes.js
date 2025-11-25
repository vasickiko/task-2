const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

router.get("/", getCourses);
router.get("/:id", getCourse);

// jwt
router.post("/", auth, createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

module.exports = router;
