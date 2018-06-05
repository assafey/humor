const logger = Logger.getLogger("DecoratorActor");

class DecoratorActor {

    initialize(selfActor) {
        if (this.commandTypes) {
            const commandTypes = this.commandTypes();
            this._decorate(selfActor, commandTypes);
        }
    }

    _decorate(selfActor, commandTypes) {
        const commands = Object.keys(commandTypes);
        for (const command of commands) {
            logger.debug("Decorating command:", command);
            selfActor[command] = (...args) => {
                logger.debug("Decorating got request to '" + command + "'");
                const commandType = commandTypes[command];
                logger.debug("Decorating command type '" + commandType + "'");
                const topics = [command].concat(args);

                if (commandType === DecoratorActor.CommandTypes.SEND_AND_RECEIVE) {
                    topics.push(process.pid);
                }

                return selfActor[commandType].apply(selfActor, topics);
            };
        }
    }

}

DecoratorActor.CommandTypes = {
    SEND_AND_RECEIVE: "sendAndReceive",
    SEND_ONLY: "send"
};

module.exports = DecoratorActor;