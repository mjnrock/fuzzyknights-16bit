import { Event } from "./Event.js";
import { PlayerConnectEvent } from "./PlayerConnectEvent.js";
import { PlayerDisconnectEvent } from "./PlayerDisconnectEvent.js";
import { EntityDamageEvent } from "./EntityDamageEvent.js";
import { EntityMoveEvent } from "./EntityMoveEvent.js";
import { EntityStateChangeEvent } from "./EntityStateChangeEvent.js";
import { EntityConstructionEvent } from "./EntityConstructionEvent.js";
import { EntityDestructionEvent } from "./EntityDestructionEvent.js";
import { EntityCollisionEvent } from "./EntityCollisionEvent.js";
import { EntityJoinWorldEvent } from "./EntityJoinWorldEvent.js";
import { EntityVelocityEvent } from "./EntityVelocityEvent.js";
import { InputMouseEvent } from "./InputMouseEvent.js";
import { InputKeyboardEvent } from "./InputKeyboardEvent.js";
import { InputPlayerKeyStateEvent } from "./InputPlayerKeyStateEvent.js";

import Handler from "./handler/package.js";
import Listener from "./listener/package.js";

export default {
	Event,
	PlayerConnectEvent,
	PlayerDisconnectEvent,
	EntityDamageEvent,
	EntityMoveEvent,
	EntityStateChangeEvent,
	EntityConstructionEvent,
	EntityDestructionEvent,
	EntityCollisionEvent,
	EntityJoinWorldEvent,
	EntityVelocityEvent,
	InputMouseEvent,
	InputKeyboardEvent,
	InputPlayerKeyStateEvent,

	Handler,
	Listener,

	Spawn: {
		Event: (...args) => new Event(...args),
		PlayerConnectEvent: (...args) => new PlayerConnectEvent(...args),
		PlayerDisconnectEvent: (...args) => new PlayerDisconnectEvent(...args),
		EntityDamageEvent: (...args) => new EntityDamageEvent(...args),
		EntityMoveEvent: (...args) => new EntityMoveEvent(...args),
		EntityJoinWorldEvent: (...args) => new EntityJoinWorldEvent(...args),
		EntityStateChangeEvent: (...args) => new EntityStateChangeEvent(...args),
		EntityConstructionEvent: (...args) => new EntityConstructionEvent(...args),
		EntityCollisionEvent: (...args) => new EntityCollisionEvent(...args),
		EntityVelocityEvent: (...args) => new EntityVelocityEvent(...args),
		InputMouseEvent: (...args) => new InputMouseEvent(...args),
		InputKeyboardEvent: (...args) => new InputKeyboardEvent(...args),
		InputPlayerKeyStateEvent: (...args) => new InputPlayerKeyStateEvent(...args)
	}
};