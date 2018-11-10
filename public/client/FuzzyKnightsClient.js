import FuzzyKnightsCommon from "../common/FuzzyKnightsCommon.js";
import Client from "./package.js";

class FuzzyKnightsClient {
	constructor(window) {
		this.Window = window;

		this.FuzzyKnightsCommon = new FuzzyKnightsCommon({
			Client: Client,
			Server: {},
			IsServer: false
		});
		this.FuzzyKnights = this.FuzzyKnightsCommon.GetFuzzyKnights();

		this.Initialize();
	}
	
	GetUUID() {
		return this.UUID;
	}
	SetUUID(uuid) {
		this.UUID = uuid;

		return this;
	}

	Initialize() {
		this.FuzzyKnights.Client.Network.ConnectionClient = new this.FuzzyKnights.Client.Network.ConnectionClient(this.FuzzyKnights);
		this.FuzzyKnights.Server.WebSocket = this.FuzzyKnights.Client.Network.ConnectionClient.WebSocket.GetWebSocket();

		this.FuzzyKnights.Client.Event.KeyHandler = new this.FuzzyKnights.Client.Event.KeyHandler(this.FuzzyKnights);

		return this;
	}

	GetFuzzyKnights() {
		return this.FuzzyKnights;
	}
	SetFuzzyKnights(fk) {
		this.FuzzyKnights = fk;

		return this;
	}
}

export default FuzzyKnightsClient;