const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const Room = require("../../../api/Room/room");

describe("Room Tests", function () {
  context("Constructor Tests", function () {
    it("Initialises with hostname", function () {
      const room = new Room("bob");
      expect(room.hostname).to.equal("bob");
      expect(room.customers).to.deep.equal([]);
      expect(room.key).to.be.a("string");
    });
    context("add Customer Tests", function () {
      it("correctly adds a new customer", function () {
        const room = new Room("bob");
        expect(room.customers).to.deep.equal([]);
        room.addCustomer("steve");
        expect(room.customers).to.deep.equal(["steve"]);
      });
    });
  });
});
