class GameManager {
	constructor(fk, player = null) {
		this.FuzzyKnights = fk;
		this.GameLoop = new this.FuzzyKnights.Common.Game.GameLoop();

		this.TickManagers = [];
		this.RenderManagers = [];

		this.SetPlayer(player);
		
		this.GameLoop.SetTickHook((time) => this.Tick(time));
		this.GameLoop.SetRenderHook((time) => this.Render(time));
	}

	Run() {
		this.GameLoop.Run();

		return this;
	}
	Pause() {
		this.GameLoop.Pause();

		return this;
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
	RemovePlayer() {
		this.Player = null;

		return this;
	}

	Tick(time) {
		this.TickManagers.forEach(t => t.Tick(time));
		
		this.Player.Tick(time);
	}

	Render(time) {
		this.RenderManagers.forEach(r => r.Render(time));
	}
}

export { GameManager };