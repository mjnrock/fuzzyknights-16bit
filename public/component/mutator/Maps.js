import EnumComponentType from "../enum/ComponentType.js";
import EnumMapType from "../enum/MapType.js";
import EnumNavigabilityType from "../enum/NavigabilityType.js";

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

		this.FuzzyKnights.Event.Spawn.EntityJoinWorldEvent(entity, map);

		return this;
	}

	GetPosition(entity) {
		return this.GetComponent(entity).ActiveMap.Heading.Position;
	}
	SetPosition(entity, x, y) {
		this.GetComponent(entity).ActiveMap.Heading.Position = this.FuzzyKnights.Utility.Physics.Position.Generate(x, y);

		return this;
	}

	GetRotation(entity) {
		return this.GetComponent(entity).ActiveMap.Heading.Rotation;
	}
	SetRotation(entity, r) {
		this.GetComponent(entity).ActiveMap.Heading.Rotation = this.FuzzyKnights.Utility.Physics.Rotation.Generate(r);

		return this;
	}

	GetHeading(entity) {
		return this.GetComponent(entity).ActiveMap.Heading;
	}
	SetHeading(entity, x, y, r = 0) {
		return this.GetComponent(entity).ActiveMap.Heading = this.FuzzyKnights.Utility.Physics.Heading.Generate(x, y, r);
	}

	GetVelocity(entity) {
		return this.GetComponent(entity).Velocity;
	}
	SetVelocity(entity, x = 0, y = 0, r = 0) {
		this.GetComponent(entity).Velocity = this.FuzzyKnights.Utility.Physics.Velocity.Generate(x, y, r);

		return this;
	}

	Tick(time, entity) {
		if(this.GetVelocity(entity).HasVelocity()) {
			let pos = this.FuzzyKnights.World.MapManager.GetActiveMap().CalcHeading(entity, time);

			if(pos[0] !== pos[2] || pos[1] !== pos[3]) {
				this.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity.UUID, ...pos);
			}
		}
	}
}

export { Maps };