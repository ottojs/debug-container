"use strict";

// Adding properties to res.locals
// will include them in the response
// whether the response is json or a view

function say_hello(req, res, next) {
  res.locals.hello = "goodbye";
  next();
}

function process_post(req, res, next) {
  // Return POST body (from JSON)
  if (req.body) {
    res.locals = req.body;
  }
  res.locals.processed = true;
  next();
}

function mark_deleted(req, res, next) {
  res.locals.deleted = true;
  next();
}

function error_next(req, res, next) {
  next(new Error("Next Error"));
}

function error_throw(req, res, next) {
  throw new Error("Throw Error");
}

function show_secret_info(req, res, next) {
  res.locals.secret = "sauce";
  next();
}

function show_view(req, res, next) {
  // Mark the view we want
  res.locals._view = "index";

  // Add data for the view
  res.locals.date = new Date();

  next();
}

// Exports
module.exports = {
  say_hello: say_hello,
  process_post: process_post,
  mark_deleted: mark_deleted,
  error_next: error_next,
  error_throw: error_throw,
  show_secret_info: show_secret_info,
  show_view: show_view,
};
