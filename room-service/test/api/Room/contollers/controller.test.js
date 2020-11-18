const Controller = require("../../../../api/Room/controllers/controller");
const Room = require("../../../../api/Room/room");
const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;

describe("Controller Tests", function () {
  var controller;
  beforeEach(() => {
    controller = new Controller();
  });

  context("Create Tests", function () {
    it("Returns 201", function () {
      const data = controller.createRoom("jamesangel140");
      expect(data.status).to.equal("201");
      expect(data.data).to.have.property("key");
    });
    it("Returns room has already been created", function () {
      controller.createRoom("jamesangel140");
      const data = controller.createRoom("jamesangel140");
      expect(data.status).to.equal("400");
      expect(data.data).to.equal("room has already been created");
    });
    it("Returns must have hosts username", function () {
      const data = controller.createRoom();
      expect(data.status).to.equal("400");
      expect(data.data).to.equal("must have hosts username");
    });
  });

  context("addCustomer Tests", function () {
    it("Returns 202", function () {
      controller.createRoom("jamesangel140");
      const data = controller.addCustomer("newUsername");
      expect(data.status).to.equal("202");
    });
    it("Returns room has not been created", function () {
      const data = controller.addCustomer("newUsername");
      expect(data.status).to.equal("400");
      expect(data.data).to.equal(
        "Room has not been created, use POST /room to create a room"
      );
    });
  });

  context("listInfo Test", function () {
    it("200, with just host", function () {
      controller.createRoom("jamesangel140");
      const data = controller.listInfo();
      expect(data.status).to.equal("200");
      expect(data.data.host).to.equal("jamesangel140");
      expect(data.data.customers).to.deep.equal([]);
    });
    it("200, with host and users ", function () {
      controller.createRoom("jamesangel140");
      controller.addCustomer("newUsername");
      const data = controller.listInfo();
      expect(data.status).to.equal("200");
      expect(data.data.host).to.equal("jamesangel140");
      expect(data.data.customers).to.deep.equal(["newUsername"]);
    });
    it("200, room has not been created", function () {
      const data = controller.listInfo();
      expect(data.status).to.equal("200");
      expect(data.data).to.deep.equal({});
    });
  });
});
