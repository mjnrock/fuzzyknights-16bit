import EnumComponentType from "../enum/ComponentType.js";

import { Mutator } from "./Mutator.js";

class Worlds extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.WORLDS);

		return comp;
	}

	GetZone(entity) {
		return this.FuzzyKnights.WorldManager.GetZone(
			this.GetComponent(entity).Identifiers.Zone
		);
	}	
	SetMap(entity, map) {		
		this.GetComponent(entity).Identifiers.Zone = map.UUID;

		this.FuzzyKnights.Event.Spawn.EntityJoinWorldEvent(entity, map);

		return this;
	}

	GetPosition(entity) {
		return this.GetComponent(entity).Heading.Position;
	}
	SetPosition(entity, x, y) {
		this.GetComponent(entity).Heading.Position = this.FuzzyKnights.Utility.Physics.Position.Generate(x, y);

		return this;
	}

	GetRotation(entity) {
		return this.GetComponent(entity).Heading.Rotation;
	}
	SetRotation(entity, r) {
		this.GetComponent(entity).Heading.Rotation = this.FuzzyKnights.Utility.Physics.Rotation.Generate(r);

		return this;
	}

	GetHeading(entity) {
		return this.GetComponent(entity).Heading;
	}
	SetHeading(entity, x, y, r = 0) {
		return this.GetComponent(entity).Heading = this.FuzzyKnights.Utility.Physics.Heading.Generate(x, y, r);
	}
	

	Tick(time, entity) {
		// if(this.GetVelocity(entity).HasVelocity()) {
		// 	let [ x0, y0, x1, y1 ] = this.FuzzyKnights.World.MapManager.GetActiveMap().CalcHeading(entity, time);

		// 	if(x0 !== x1 || y0 !== y1) {
		// 		this.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity.UUID, x0, y0, x1, y1);
		// 	}
		// }
	}
}

export { Worlds as Maps };