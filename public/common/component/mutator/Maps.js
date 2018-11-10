import EnumComponentType from "../enum/ComponentType.js";
import EnumMapType from "../enum/MapType.js";

import { Mutator } from "./Mutator.js";
import { Map } from "../element/Map.js";

class Maps extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.MAPS);

		return comp;
	}

	GetMap(entity) {
		return this.FuzzyKnights.Common.World.Tile.TileManager.FindMap(
			this.GetComponent(entity).ActiveMap.MapIdentifier
		);
	}	
	SetMap(entity, map) {
		let pos = map.GetDefaultSpawn();
		
		this.GetComponent(entity).ActiveMap = new Map(
			EnumMapType.TILE,
			pos.X,
			pos.Y,
			map.UUID
		);

		return this;
	}

	SetPosition(entity, x, y) {
		return this.GetComponent(entity).ActiveMap.Position.Set(x, y);
	}
	GetPosition(entity) {
		return this.GetComponent(entity).ActiveMap.Position;
	}

	Place(entity, x0, y0, x1, y1) {
		let map = this.GetMap(entity);
		map.MoveEntity(entity, x0, y0, x1, y1);

		return this;
	}

	Move(entity) {
		//TODO While Key State is ACTIVE, set Component's Directional Velocity to "Navigability Speed",
		//TODO let either some .Tick() use the LastTickTime to calculate how far Entity should move based on that velocity and elapsed time
		let map = this.GetMap(entity);

		// this.FuzzyKnights.Common.Event.Spawn.EntityMoveEvent(entity.UUID, x1, y1);

		return this;
	}
}

export { Maps };