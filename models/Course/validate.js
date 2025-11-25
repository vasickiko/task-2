const CreateCourse = {
    title: 'required|string|minLength:3',
    duration: 'required|integer|min:1',
    academyId: 'required|string'
};

const UpdateCourse = {
    title: 'string|minLength:3',
    duration: 'integer|min:1',
    academyId: 'string'
};

module.exports = {
    CreateCourse,
    UpdateCourse
};
