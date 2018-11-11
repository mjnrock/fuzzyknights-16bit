import { Message } from "./Message.js";
import { PlayerConnectMessage } from "./PlayerConnectMessage.js";
import { PlayerDisconnectMessage } from "./PlayerDisconnectMessage.js";
import { InputKeyboardMessage } from "./InputKeyboardMessage.js";
import { InputPlayerKeyStateMessage } from "./InputPlayerKeyStateMessage.js";
import { EntityDamageMessage } from "./EntityDamageMessage.js";
import { EntityMoveMessage } from "./EntityMoveMessage.js";
import { EntityStateChangeMessage } from "./EntityStateChangeMessage.js";
import { EntityConstructionMessage } from "./EntityConstructionMessage.js";
import { EntityDestructionMessage } from "./EntityDestructionMessage.js";

import MessageManager from "./MessageManager.js";

import Packet from "./packet/package.js";

export default {
	Message,
	
	PlayerConnectMessage,
	PlayerDisconnectMessage,

	InputKeyboardMessage,
	InputPlayerKeyStateMessage,

	EntityDamageMessage,
	EntityMoveMessage,
	EntityStateChangeMessage,
	EntityConstructionMessage,
	EntityDestructionMessage,

	MessageManager,
	Packet
};