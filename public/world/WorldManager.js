class WorldManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.TileManager = this.FuzzyKnights.World.Tile.TileManager;
	}

	Tick(time) {
		this.TileManager.Tick(time);
	}
}

export { WorldManager };