class WorldManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.MapManager = this.FuzzyKnights.World.MapManager;
	}

	Tick(time) {
		this.MapManager.Tick(time);
	}
}

export { WorldManager };