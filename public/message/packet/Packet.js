class Packet {
	constructor(packetType, msg, sender) {
		this.PacketType = packetType;
		this.Message = msg;
		this.Sender = sender;

		this.Timestamp = Date.now();
	}
}

export { Packet };