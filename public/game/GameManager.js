class GameManager {
	constructor(fk, player = null) {
		this.FuzzyKnights = fk;
		this.GameLoop = this.FuzzyKnights.Game.GameLoop;

		this.TickManagers = [];
		this.RenderManagers = [];

		this.Player = player;
		
		this.Settings = Object.freeze({
			Movement: {
				Velocity: 2.5
			}
		});
		
		this.GameLoop.SetTickHook((time) => this.Tick(time));
		this.GameLoop.SetRenderHook((time) => this.Render(time));
	}

	AddTickManager(manager) {
		this.TickManagers.push(manager);

		return this;
	}
	AddRenderManager(manager) {
		this.RenderManagers.push(manager);

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
		this.TickManagers.forEach(t => t.Tick(time));
	}

	Render(time) {
		this.RenderManagers.forEach(r => r.Render(time));
	}
}

export { GameManager };