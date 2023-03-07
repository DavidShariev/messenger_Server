import authByToken from "./auth.js";
import loginHandler from "./login.js";
import registrationHandler from "./registration.js";

export default {
    authByToken: authByToken,
    login: loginHandler,
    registration: registrationHandler,
};
