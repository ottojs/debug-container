"use strict";

// Modules
var supertest = require("supertest");

// Subject
var app = require("../../app/index.js");

// Bind SuperTest
var request = supertest(app);

describe("GET /boilerplate", function () {
  it("should respond with 200", function (done) {
    request
      .get("/boilerplate")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ hello: "goodbye" })
      .end(done);
  });
});

describe("POST /boilerplate", function () {
  it("should respond with 200", function (done) {
    request
      .post("/boilerplate")
      .set("Accept", "application/json")
      .send({ data: "test" })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ data: "test", processed: true })
      .end(done);
  });
});

describe("DELETE /boilerplate", function () {
  it("should respond with 200", function (done) {
    request
      .del("/boilerplate")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ deleted: true })
      .end(done);
  });
});

describe("Method Override", function () {
  // POST /boilerplate (same as above) with override
  it("should respond with 200 and { deleted : true }", function (done) {
    request
      .post("/boilerplate?_method=DELETE")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ deleted: true })
      .end(done);
  });
});

describe("GET /boilerplate-view", function () {
  it("should respond with 200", function (done) {
    request
      .get("/boilerplate-view")
      .expect("Content-Type", /html/)
      .expect(200)
      .expect(/Date using EJS variables/)
      .end(done);
  });
});

describe("Protected Route", function () {
  var correct_username = "bob";
  var correct_password = "bobisthebest";
  var incorrect_username = "alice";
  var incorrect_password = "aliceisthebest";

  it("should deny a request without credentials", function (done) {
    request
      .get("/boilerplate-protected")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .expect({
        error: {
          type: "client",
          name: "ErrorUnauthorized",
          message: "Authentication Failed",
        },
      })
      .end(done);
  });

  it("should deny a request with an incorrect username/password", function (done) {
    request
      .get("/boilerplate-protected")
      .set("Accept", "application/json")
      .auth(incorrect_username, incorrect_password)
      .expect("Content-Type", /json/)
      .expect(401)
      .expect({
        error: {
          type: "client",
          name: "ErrorUnauthorized",
          message: "Authentication Failed",
        },
      })
      .end(done);
  });

  it("should deny a request with an incorrect username", function (done) {
    request
      .get("/boilerplate-protected")
      .set("Accept", "application/json")
      .auth(incorrect_username, correct_password)
      .expect("Content-Type", /json/)
      .expect(401)
      .expect({
        error: {
          type: "client",
          name: "ErrorUnauthorized",
          message: "Authentication Failed",
        },
      })
      .end(done);
  });

  it("should deny a request with an incorrect password", function (done) {
    request
      .get("/boilerplate-protected")
      .set("Accept", "application/json")
      .auth(correct_username, incorrect_password)
      .expect("Content-Type", /json/)
      .expect(401)
      .expect({
        error: {
          type: "client",
          name: "ErrorUnauthorized",
          message: "Authentication Failed",
        },
      })
      .end(done);
  });

  it("should allow a request with a correct username/password", function (done) {
    request
      .get("/boilerplate-protected")
      .set("Accept", "application/json")
      .auth(correct_username, correct_password)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ secret: "sauce" })
      .end(done);
  });
});

describe("Not Found (404)", function () {
  it("should respond with 404 and the path/method", function (done) {
    request
      .get("/boilerplate-does-not-exist")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect({
        error: {
          type: "client",
          name: "ErrorNotFound",
          message: "Resource was not found",
          data: {
            method: "GET",
            path: "/boilerplate-does-not-exist",
          },
        },
      })
      .end(done);
  });

  // Should not return query strings
  it("should respond with 404 and the path/method", function (done) {
    request
      .post("/boilerplate-lost-in-space?query=string&stuff=things")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect({
        error: {
          type: "client",
          name: "ErrorNotFound",
          message: "Resource was not found",
          data: {
            method: "POST",
            path: "/boilerplate-lost-in-space",
          },
        },
      })
      .end(done);
  });
});

describe("Server Error (500)", function () {
  it("should respond with 500 when handling a error passed to next()", function (done) {
    request
      .get("/boilerplate-error-next")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect({
        error: {
          type: "server",
          name: "Error",
          message: "Next Error",
        },
      })
      .end(done);
  });

  it("should respond with 500 when handling a thrown error", function (done) {
    request
      .get("/boilerplate-error-throw")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect({
        error: {
          type: "server",
          name: "Error",
          message: "Throw Error",
        },
      })
      .end(done);
  });
});
