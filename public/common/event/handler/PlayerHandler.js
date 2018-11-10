class PlayerHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	//TODO	At some point, will need to account for a Player temporarily dropping
	//TODO	Maybe put "SessionDisconnectors" by IP address/Username that caches list for reference

	onPlayerConnect(msg) {
		if(!this.FuzzyKnights.IsServer) {
			this.FuzzyKnights.Client.Network.ConnectionClient.UUID = msg.Payload.UUID;
			this.FuzzyKnights.Client.Network.ConnectionClient.WebSocket.UUID = msg.Payload.UUID;
		} else {
			this.FuzzyKnights.Common.Message.Packet.PacketManager.SpawnClient(msg, msg.Payload.UUID);
		}

		let player = new this.FuzzyKnights.Common.Game.Player();
		player.SetUUID(msg.Payload.UUID);
		this.FuzzyKnights.Common.Game.GameManager.Register(player);
	}
	onPlayerDisconnect(msg) {
		let player = this.FuzzyKnights.Common.Game.GameManager.GetPlayer(msg.Payload.UUID);
		this.FuzzyKnights.Common.Game.GameManager.Unregister(player);
	}

	ProcessMessage(msg) {
		let payload = Object.values(msg.Payload);
		if(msg.MessageType === "PlayerConnectMessage") {
			this.onPlayerConnect(msg, ...payload);
		} else if(msg.MessageType === "PlayerDisconnectMessage") {
			this.onPlayerDisconnect(msg, ...payload);
		}
	}
	ReceiveMessage(msg, time = null) {
		this.ProcessMessage(msg);

		if(this.FuzzyKnights.IsServer) {
			console.log(`[MESSAGE RECEIVED - PlayerHandler]: ${msg.MessageType}`);
		} else {
			console.log(`[MESSAGE RECEIVED]: ${msg.MessageType}`, msg);
		}
	}
}

export { PlayerHandler };