import EnumComponentType from "./../enum/ComponentType.js";
import EnumMapType from "./../enum/_MapType.js";
import EnumNavigabilityType from "./../enum/NavigabilityType.js";

import { Mutator } from "./Mutator.js";
import { Map } from "./../element/_Map.js";

class Maps extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.MAPS);

		return comp;
	}

	GetMap(entity) {
		return this.FuzzyKnights.Common.World.MapManager.FindMap(
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

		this.FuzzyKnights.Common.Event.Spawn.EntityJoinWorldEvent(entity, map);

		return this;
	}

	GetPosition(entity) {
		return this.GetComponent(entity).ActiveMap.Heading.Position;
	}
	SetPosition(entity, x, y) {
		this.GetComponent(entity).ActiveMap.Heading.Position = this.FuzzyKnights.Common.Utility.Physics.Position.Generate(x, y);

		return this;
	}

	GetRotation(entity) {
		return this.GetComponent(entity).ActiveMap.Heading.Rotation;
	}
	SetRotation(entity, r) {
		this.GetComponent(entity).ActiveMap.Heading.Rotation = this.FuzzyKnights.Common.Utility.Physics.Rotation.Generate(r);

		return this;
	}

	GetHeading(entity) {
		return this.GetComponent(entity).ActiveMap.Heading;
	}
	SetHeading(entity, x, y, r = 0) {
		return this.GetComponent(entity).ActiveMap.Heading = this.FuzzyKnights.Common.Utility.Physics.Heading.Generate(x, y, r);
	}

	GetVelocity(entity) {
		return this.GetComponent(entity).Velocity;
	}
	SetVelocity(entity, x = 0, y = 0, r = 0) {
		this.GetComponent(entity).Velocity = this.FuzzyKnights.Common.Utility.Physics.Velocity.Generate(x, y, r);

		return this;
	}

	Tick(time, entity) {
		if(this.GetVelocity(entity).HasVelocity()) {
			let [ x0, y0, x1, y1 ] = this.FuzzyKnights.Common.World.MapManager.GetActiveMap().CalcHeading(entity, time);

			if(x0 !== x1 || y0 !== y1) {
				this.FuzzyKnights.Common.Event.Spawn.EntityMoveEvent(entity.UUID, x0, y0, x1, y1);
			}
		}
	}
}

export { Maps };