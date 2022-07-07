"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleResErrors = handleResErrors;

function handleResErrors(error, res) {
  if (error.name === "ValidationError") {
    return handleMongoValidatorError(error, res);
  }

  return handleErrorDefault(error, res);
}

function handleErrorDefault(error, res) {
  return res.status(500).send({
    error: error.name,
    message: error.message
  });
}

function handleMongoValidatorError(error, res) {
  let errors = {};
  Object.keys(error.errors).forEach(key => {
    errors[key] = error.errors[key].message;
  });
  return res.status(400).send(errors);
}