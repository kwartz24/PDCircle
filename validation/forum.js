const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';

    if (!Validator.isLength(data.handle, {min: 3, max : 40})) {
        errors.handle = 'Handle needs to be between 3 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)){
        errors.handle = 'Forum handle is requird'
    }
}