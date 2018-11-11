import { Event } from "./Event.js";
import { PlayerConnectEvent } from "./PlayerConnectEvent.js";
import { PlayerDisconnectEvent } from "./PlayerDisconnectEvent.js";
import { EntityDamageEvent } from "./EntityDamageEvent.js";
import { EntityMoveEvent } from "./EntityMoveEvent.js";
import { EntityStateChangeEvent } from "./EntityStateChangeEvent.js";
import { EntityConstructionEvent } from "./EntityConstructionEvent.js";
import { EntityDestructionEvent } from "./EntityDestructionEvent.js";

import Handler from "./handler/package.js";

export default {
	Event,
	PlayerConnectEvent,
	PlayerDisconnectEvent,
	EntityDamageEvent,
	EntityMoveEvent,
	EntityStateChangeEvent,
	EntityConstructionEvent,
	EntityDestructionEvent,

	Handler,

	Spawn: {
		Event: (...args) => new Event(...args),
		PlayerConnectEvent: (...args) => new PlayerConnectEvent(...args),
		PlayerDisconnectEvent: (...args) => new PlayerDisconnectEvent(...args),
		EntityDamageEvent: (...args) => new EntityDamageEvent(...args),
		EntityMoveEvent: (...args) => new EntityMoveEvent(...args),
		EntityStateChangeEvent: (...args) => new EntityStateChangeEvent(...args),
		EntityConstructionEvent: (...args) => new EntityConstructionEvent(...args)
	}
};