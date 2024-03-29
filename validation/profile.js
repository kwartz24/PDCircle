const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required' ;
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)){jhkopj
      errors.website ='Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};