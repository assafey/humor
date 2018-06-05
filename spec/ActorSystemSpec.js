const actorSystem = require('../lib/ActorSystem');

class SomeEvent {}

describe("ActorSystem", () => {

    beforeEach(async () => {
        await actorSystem.initialize();
    });

    it("should create new actor", async () => {
        const someActor = await actorSystem.getOrCreate(SomeEvent, "actor-id");
        expect(someActor).toBeDefined();
    });

    it("should use same actor when trying to create same actor twice", async () => {
        const someActor1 = await actorSystem.getOrCreate(SomeEvent, "actor-id");
        const someActor2 = await actorSystem.getOrCreate(SomeEvent, "actor-id");

        expect(someActor1).toBe(someActor2);
    });

    it("should create new actor when trying to create same actor twice without actor id", async () => {
        const someActor1 = await actorSystem.getOrCreate(SomeEvent);
        const someActor2 = await actorSystem.getOrCreate(SomeEvent);

        expect(someActor1).not.toBe(someActor2);
    });
    
});