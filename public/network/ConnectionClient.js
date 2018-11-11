import WebSocketHelper from "./WebSocketHelper.js";

class ConnectionClient {
	constructor(fk, server = "localhost", port = 3099) {
		this.Server = server;
		this.Port = port;

		this.WebSocket = new WebSocketHelper(fk, `ws://${this.Server}:${this.Port}/ws`);
	}
}

export default ConnectionClient;