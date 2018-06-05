const DecoratorActor = require('./DecoratorActor');

const logger = Logger.getLogger("PersistActor");

class PersistActor extends DecoratorActor {
    initialize(selfActor) {
        super.initialize(selfActor);

        this.persist_id = selfActor.id;

        this._events = [{
            persist_id: this.persist_id,
            type: 'TaskDeleted',
            timestamp: Date.now(),
            task: {
                "title": "hi"
            }
        }, {
            persist_id: this.persist_id,
            type: 'TaskAdded',
            timestamp: Date.now(),
            task: {
                "title": "hi"
            }
        }];

        if (this.recover) {
            logger.debug("Calling recover...");
            this._events.reverse().forEach(event => {
                this.recover(global[event.type].create(event))
            });
        } else {
            logger.debug("No recover handler.");
        }
    }

    async persist(eventObj) {
        logger.info("Persist:", eventObj);
        eventObj.content.persist_id = this.persist_id;
        this._events.push(eventObj.content);
        return eventObj;
    }
}

module.exports = PersistActor;
