class GameManager {
	constructor(fk, player = null) {
		this.FuzzyKnights = fk;
		this.GameLoop = this.FuzzyKnights.Game.GameLoop;

		this.Managers = [];

		this.Player = player;
		
		this.GameLoop.SetTickHook((time) => this.Tick(time));
	}

	AddManager(manager) {
		this.Managers.push(manager);

		return this;
	}

	GetPlayer() {
		return this.Player;
	}
	SetPlayer(player) {
		this.Player = player;

		return this;
	}

	Tick(time) {
		for(let i = 0; i < this.Managers.length; i++) {
			this.Managers[i].Tick(time);
		}
	}
}

export { GameManager };