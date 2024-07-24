"use strict";

// Modules
var should = require("should");
should("delint").not.equal("bypass");

// Subject
var controller_boilerplate = require("../../../app/controllers/boilerplate.controller.js");

describe("Controller - Boilerplate", function () {
  describe(".say_hello()", function () {
    it('should add a "hello" property to res.locals', function () {
      var res = { locals: {} };
      controller_boilerplate.say_hello({}, res, function () {
        res.locals.should.have.property("hello").and.equal("goodbye");
      });
    });
  });

  describe(".process_post()", function () {
    it("should set res.locals equal to req.body when req.body is set", function () {
      var req = { body: { posted: "value" } };
      var res = { locals: {} };
      controller_boilerplate.process_post(req, res, function () {
        res.locals.should.have.property("posted").and.equal("value");
      });
    });

    it('should add a "processed" property to res.locals', function () {
      var res = { locals: {} };
      controller_boilerplate.process_post({}, res, function () {
        res.locals.should.have.property("processed").and.equal(true);
      });
    });
  });

  describe(".mark_deleted()", function () {
    it('should add a "deleted" property to res.locals', function () {
      var res = { locals: {} };
      controller_boilerplate.mark_deleted({}, res, function () {
        res.locals.should.have.property("deleted").and.equal(true);
      });
    });
  });

  describe(".error_next()", function () {
    it("should pass an error to next()", function () {
      controller_boilerplate.error_next({}, {}, function (error) {
        error.should.be.type("object");
        error.should.have.property("name").and.equal("Error");
        error.should.have.property("message").and.equal("Next Error");
      });
    });
  });

  describe(".error_throw()", function () {
    it("should throw an error", function () {
      try {
        controller_boilerplate.error_throw({}, {}, function () {});
      } catch (error) {
        error.should.be.type("object");
        error.should.have.property("name").and.equal("Error");
        error.should.have.property("message").and.equal("Throw Error");
      }
    });
  });

  describe(".show_secret_info()", function () {
    it('should add a "secret" property to res.locals', function () {
      var res = { locals: {} };
      controller_boilerplate.show_secret_info({}, res, function () {
        res.locals.should.have.property("secret").and.equal("sauce");
      });
    });
  });

  describe(".show_view()", function () {
    it("should set res.locals._view and res.locals.date", function () {
      var res = { locals: {} };
      controller_boilerplate.show_view({}, res, function () {
        res.locals.should.have.property("_view").and.equal("index");
        res.locals.should.have.property("date");
      });
    });
  });
});
