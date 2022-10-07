const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateForumInput(data) {
    let errors = {};

    data.topic = !isEmpty(data.topic) ? data.topic : '';
    data.status = !isEmpty(data.status) ? data.status : '';

    if (!Validator.isLength(data.topic, {min: 3, max : 40})) {
        errors.topic = 'topic needs to be between 3 and 40 characters';
    }

    if (Validator.isEmpty(data.topic)){
        errors.topic = 'Forum topic is required'
    }
}