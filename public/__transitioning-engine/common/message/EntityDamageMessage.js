import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityDamageMessage extends Message {
	constructor(target, source, damage, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
                Target: target,
                Source: source,
                Damage: damage
			},
			isServerOrigin
		);
	}
}

export { EntityDamageMessage };