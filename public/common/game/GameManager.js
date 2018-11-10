import { Player } from "./Player.js";

class GameManager {
	constructor(fk, players = {}) {
		this.FuzzyKnights = fk;
		this.GameLoop = this.FuzzyKnights.Common.Game.GameLoop;
		this.Managers = [];

		this.Players = players;
		
		this.GameLoop.SetTickHook((time) => this.Tick(time));
	}

	AddManager(manager) {
		this.Managers.push(manager);

		return this;
	}

	HasPlayer(search) {
		let ent;
		if(search instanceof Player) {
			ent = this.Players[search.UUID];
		} else if(typeof search === "string" || search instanceof String) {
			ent = this.Players[search];
		}
				
		return ent !== null && ent !== void 0;
	}

	GetPlayer(uuid) {
		return this.Players[uuid];
	}
	SetPlayer(uuid, player) {
		this.Players[uuid] = player;

		return this;
	}

	Register(...players) {
		for(let i in players) {
			this.Players[players[i].UUID] = players[i];
		}

		return this;
	}
	Unregister(...players) {
		for(let i in players) {
			delete this.Players[players[i].UUID];
		}

		return this;
	}

	Tick(time) {
		for(let i = 0; i < this.Managers.length; i++) {
			this.Managers[i].Tick(time);
		}
	}
}

export { GameManager };