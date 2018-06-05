const actors = require('comedy');

const actorSystem = actors(); // Create an actor system.

class ActorSystem {

    async initialize() {
        this._actors = {};
        this._rootActor = await actorSystem.rootActor();
    }

    async getOrCreate(type, actorId) {
        const typeName = type.name;
        if (actorId && typeName in this._actors && actorId in this._actors[typeName]) {
            return this._actors[typeName][actorId];
        } else {
            const newActor = await this._rootActor.createChild(type, { id: actorId /*, mode: "forked"*/ });
            this._actors[typeName] = { [actorId]: newActor };
            return newActor;
        }
    }

}

module.exports = new ActorSystem();