import EnumHandlerType from "./../../common/enum/HandlerType.js";

class WebSocketHelper {
	constructor(fk, url = `ws://localhost:1337/ws`) {
		this.FuzzyKnights = fk;
		this.UUID = null;
		this.ws = new WebSocket(url);
		this.ws.onopen = (e) => this.OnOpen(e);
		this.ws.onmessage = (e) => this.OnMessage(e);
		this.ws.onclose = (e) => this.OnClose(e);
	}

	GetWebSocket() {
		return this.ws;
	}

	ConnectionWrapper(socket, callback) {
		let timeout = 250;

		setTimeout(() => {
			if(socket.readyState === 1) {
				if(typeof callback === "function") {
					callback();
				}
			} else {
				this.ConnectionWrapper(socket, callback);
			}
		}, timeout);
	}

	Send(message) {
		// console.log("Sending message to the server...");
		try {
			this.ConnectionWrapper(this.ws, () =>
				this.ws.send(
					JSON.stringify(message)
				)
			);

			return true;
		} catch (e) {
			return false;
		}
	}

	OnOpen(e) {
		console.log("[Opened] WebSocket Connection");
		// this.ws.send("Hey!");
	}

	OnMessage(e) {
		if(e.isTrusted && this.FuzzyKnights.Common.Message.Packet.PacketManager.ExtractMessage) {
			this.FuzzyKnights.Common.Message.Packet.PacketManager.ExtractMessage(e.data);
		}
	}

	OnClose(e) {
		// console.log(e);
	}
}

export default WebSocketHelper;