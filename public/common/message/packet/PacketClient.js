import EnumPacketType from "../../enum/PacketType.js";

import { Packet } from "./Packet.js";

class PacketClient extends Packet {
	constructor(msg, sender, receiver) {
		super(EnumPacketType.CLIENT, msg, sender);
		this.Receiver = receiver;
	}
}

export { PacketClient };