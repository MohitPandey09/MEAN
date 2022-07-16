const Validator = require('validatorjs');

// const validator = (body, rules, customMessages, callback) => {
//     const validation = new Validator(body, rules, customMessages);
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false));
// };

const validator = (body, rules, customMessages) => {
    const validation = new Validator(body, rules, customMessages);
    if (validation.passes()) {
        return true;
    } else {
        return validation.errors;
    }
}

module.exports = validator;
