const route = require("../../../../api/Room/routes/index");

const request = require("supertest");
const express = require("express");
const { expect } = require("chai");
const app = express();

describe("Router Tests", function () {
  app.use(express.urlencoded({ extended: false }));
  app.use("/", route);

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
      .expect(201, done)
  });

  it("lists new room", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        const key = Object.keys(res.body)[0];
        expect(res.body[key].hostname).to.equal('jamesangel140');
        expect(res.body[key].customers).to.deep.equal([]);
        done();
      });
  });

  it("adds a new customer", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
          const key = Object.keys(res.body)[0];
        request(app)
        .put("/")
        .type("form")
        .send({customerUsername : "bob", roomKey: key })
        .expect(202, done)
      });
  });

  it("new customer is in the room", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        const key = Object.keys(res.body)[0];
        expect(res.body[key].hostname).to.equal('jamesangel140');
        expect(res.body[key].customers).to.deep.equal(['bob']);
        done();
      });
  });

  it("attempts to delete a room, without being the host", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
          const key = Object.keys(res.body)[0];
        request(app)
        .delete("/")
        .type("form")
        .send({hostname : "bob", roomKey: key })
        .expect(400, done)
      });
  });

  it("deletes a room", function (done) {
    request(app)
      .get("/")
      .type("form")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
          const key = Object.keys(res.body)[0];
        request(app)
        .delete("/")
        .type("form")
        .send({hostname : "jamesangel140", roomKey: key })
        .expect(204, done)
      });
  });
});
