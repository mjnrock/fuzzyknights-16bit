class WorldManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Players = [];
		this.Dimensions = [];
	}

	GetPlayer(uuid) {
		return this.Players.filter(p => p.UUID === uuid)[0] || false;
	}
	AddPlayer(dim) {
		this.Players.push(dim);

		return this;
	}
	RemovePlayer(uuid) {
		this.Players = this.Players.filter(d => d.UUID !== uuid);

		return this;
	}

	GetDimension(uuid) {
		return this.Dimensions.filter(d => d.UUID === uuid)[0] || false;
	}
	AddDimension(dim) {
		this.Dimensions.push(dim);

		return this;
	}
	RemoveDimension(uuid) {
		this.Dimensions = this.Dimensions.filter(d => d.UUID !== uuid);

		return this;
	}

	Tick(time) {
		this.Players.forEach(player => {
			let map = this.FuzzyKnights.Component.Mutator.Worlds.GetMap(player.GetEntity());

			map.Tick(time);
		});
	}
}

export { WorldManager };