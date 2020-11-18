const { router } = require("../../../../api/Room/routes/router");

const request = require("supertest");
const express = require("express");
const { expect } = require("chai");
const app = express();

describe("Router Tests", function () {
  app.use(express.urlencoded({ extended: false }));
  app.use("/", router);

  it("When Initalised there are no rooms", function (done) {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({})
      .expect(200, done);
  });

  it("Creates a new room and returns a key", function (done) {
    request(app)
      .post("/")
      .type("form")
      .send({ hostname: "jamesangel140" })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });

  it("lists new room", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.host).to.equal("jamesangel140");
        expect(res.body.customers).to.deep.equal([]);
        done();
      });
  });

  it("adds a new customer", function (done) {
    request(app)
      .put("/")
      .type("form")
      .send({ customerUsername: "bob"})
      .expect(202, done);
  });

  it("new customer is in the room", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.host).to.equal("jamesangel140");
        expect(res.body.customers).to.deep.equal(["bob"]);
        done();
      });
  });
});
