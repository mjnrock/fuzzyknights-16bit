import EnumPacketType from "./../../enum/PacketType.js";

import { Packet } from "./Packet.js";

class PacketServer extends Packet {
	constructor(msg, sender = null) {
		super(EnumPacketType.SERVER, msg, sender);
	}
}

export { PacketServer };