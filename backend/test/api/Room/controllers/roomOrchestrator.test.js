const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const RoomOrchestrator = require("../../../../api/Room/controllers/roomOrchestrator");

describe("RoomOrchestrator Tests", function () {
  context("Constructor Tests", function () {
    it("Initialises with hostname", function () {
      const roomOrchestrator = new RoomOrchestrator();
      expect(roomOrchestrator.rooms).to.deep.equal({});
    });
  });

  context("addCustomer Tests", function () {
    it("correctly adds a new customer", function () {
      const roomOrchestrator = new RoomOrchestrator();
      expect(roomOrchestrator.rooms).to.deep.equal({});
      const key = roomOrchestrator.createRoom("bob");
      roomOrchestrator.addCustomer("steve", key);
      const rooms = roomOrchestrator.listInfo();
      expect(rooms[key].customers).to.deep.equal(['steve']);
    });

    it("throws error if room doesn't exists", function () {
        const roomOrchestrator = new RoomOrchestrator();
        try {
            roomOrchestrator.addCustomer("steve", 'asdgaf');            
        } catch (error) {
            expect(error).to.equal('room does not exist')
        }
      });
  });

  context("create room tests", function () {
    it("creates a new room", function () {
      const roomOrchestrator = new RoomOrchestrator();
      expect(roomOrchestrator.rooms).to.deep.equal({});
      const key = roomOrchestrator.createRoom("bob");
      expect(roomOrchestrator.rooms[key].hostname).to.deep.equal('bob');
    });
  });

  context("deleteRoom tests", function () {
    it("correctly adds a new customer", function () {
        const roomOrchestrator = new RoomOrchestrator();
        expect(roomOrchestrator.rooms).to.deep.equal({});
        const key = roomOrchestrator.createRoom("bob");
        roomOrchestrator.deleteRoom(key);
        expect(roomOrchestrator.rooms).to.deep.equal({});
    });
  });
});
