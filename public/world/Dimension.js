import { NewUUID } from "./../utility/Functions.js";

class Dimension {
	constructor(world, maps = []) {
		this.World = world;

		this.Lookup = {};
		maps.forEach(map => {
			this.Add(map);
		});

		this.UUID = NewUUID();
	}

	GetWorld() {
		return this.World;
	}
	SetWorld(world) {
		this.World = world;

		return this;
	}

	Get(uuid) {
		return this.Lookup[uuid];
	}
	Add(map) {
		this.Lookup[map.UUID] = map;

		return this;
	}

	Remove(uuid) {
		delete this.Lookup[uuid];

		return this;
	}
}

export { Dimension };