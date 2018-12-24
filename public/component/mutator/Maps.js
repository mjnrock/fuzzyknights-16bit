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
		return this.FuzzyKnights.World.MapManager.FindMap(
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

	GetPosition(entity) {
		return this.GetComponent(entity).ActiveMap.Position;
	}
	SetPosition(entity, x, y) {
		return this.GetComponent(entity).ActiveMap.Position.Set(x, y);
	}
	//TODO This could be a lot of processing per tick at scale, create an IsDirty flag in each component (at a minimum this one)
	CalcPosition(entity, time) {
		let pos = this.GetPosition(entity),
			vel = this.GetVelocity(entity),
			map = this.GetMap(entity),
			x = this.FuzzyKnights.Utility.Functions.Clamp(pos.X + (vel.Vector.X * time), 0, map.Grid.XMax - 1),
			y = this.FuzzyKnights.Utility.Functions.Clamp(pos.Y + (vel.Vector.Y * time), 0, map.Grid.YMax - 1);

		this.SetPosition(entity, x, y);
	}

	GetVelocity(entity) {
		return this.GetComponent(entity).Velocity;
	}
	SetVelocity(entity, x = 0, y = 0, r = 0) {
		this.GetComponent(entity).Velocity = this.FuzzyKnights.Utility.Physics.Velocity.Generate(x, y, r);

		return this;
	}

	GetRotation(entity) {
		return this.GetComponent(entity).Rotation;
	}
	SetRotation(entity, y) {
		this.GetComponent(entity).Rotation = this.FuzzyKnights.Utility.Physics.Rotation.Generate(y);

		return this;
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

		// this.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity.UUID, x1, y1);

		return this;
	}
}

export { Maps };