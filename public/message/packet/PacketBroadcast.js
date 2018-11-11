import EnumPacketType from "../../enum/PacketType.js";

import { Packet } from "./Packet.js";

class PacketBroadcast extends Packet {
	constructor(msg, sender) {
		super(EnumPacketType.BROADCAST, msg, sender);
	}
}

export { PacketBroadcast };