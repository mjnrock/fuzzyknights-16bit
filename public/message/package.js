import { Message } from "./Message.js";
import { PlayerConnectMessage } from "./PlayerConnectMessage.js";
import { PlayerDisconnectMessage } from "./PlayerDisconnectMessage.js";
import { InputKeyboardMessage } from "./InputKeyboardMessage.js";
import { InputPlayerKeyStateMessage } from "./InputPlayerKeyStateMessage.js";
import { InputMouseMessage } from "./InputMouseMessage.js";
import { EntityDamageMessage } from "./EntityDamageMessage.js";
import { EntityMoveMessage } from "./EntityMoveMessage.js";
import { EntityStateChangeMessage } from "./EntityStateChangeMessage.js";
import { EntityConstructionMessage } from "./EntityConstructionMessage.js";
import { EntityDestructionMessage } from "./EntityDestructionMessage.js";
import { EntityCollisionMessage } from "./EntityCollisionMessage.js";
import { EntityJoinWorldMessage } from "./EntityJoinWorldMessage.js";
import { EntityVelocityMessage } from "./EntityVelocityMessage.js";

import MessageManager from "./MessageManager.js";

export default {
	Message,
	
	PlayerConnectMessage,
	PlayerDisconnectMessage,

	InputKeyboardMessage,
	InputPlayerKeyStateMessage,
	InputMouseMessage,

	EntityDamageMessage,
	EntityMoveMessage,
	EntityStateChangeMessage,
	EntityConstructionMessage,
	EntityDestructionMessage,
	EntityCollisionMessage,
	EntityJoinWorldMessage,
	EntityVelocityMessage,

	MessageManager
};