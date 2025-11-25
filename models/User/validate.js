const RegisterUser = {
    username: 'required|string|minLength:3',
    email: 'required|email',
    password: 'required|string|minLength:6'
};

const LoginUser = {
    email: 'required|email',
    password: 'required|string'
};

module.exports = {
    RegisterUser,
    LoginUser
};
