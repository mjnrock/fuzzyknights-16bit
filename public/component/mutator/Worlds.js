import { Clamp } from "./../../utility/Functions.js";
import EnumComponentType from "../enum/ComponentType.js";

import { Mutator } from "./Mutator.js";

class Worlds extends Mutator {
	constructor(fk) {
		super(fk, EnumComponentType.WORLDS);
	}

	GetZone(entity) {
		return this.FuzzyKnights.World.WorldManager.GetZone(
			this.GetComponent(entity).Identifiers.Zone
		);
	}	
	SetZone(entity, zone) {		
		this.GetComponent(entity).Identifiers.Zone = zone.UUID;

		this.FuzzyKnights.Event.Spawn.EntityJoinWorldEvent(entity, zone);

		return this;
	}

	GetPoint(entity) {
		return this.GetComponent(entity).Heading.Point;
	}
	SetPoint(entity, x, y) {
		x = Clamp(x, 0, this.GetZone(entity).Width);
		y = Clamp(y, 0, this.GetZone(entity).Height);

		this.GetComponent(entity).Heading.Point = this.FuzzyKnights.Physics.D2.Point.Generate(x, y);

		return this;
	}

	GetAngle(entity) {
		return this.GetComponent(entity).Heading.Angle;
	}
	SetAngle(entity, r) {
		this.GetComponent(entity).Heading.Angle = this.FuzzyKnights.Physics.D2.Angle.Generate(r);

		return this;
	}

	GetHeading(entity) {
		return this.GetComponent(entity).Heading;
	}
	SetHeading(entity, x, y, r = 0) {
		return this.GetComponent(entity).Heading = this.FuzzyKnights.Physics.D2.Orientation.Generate(x, y, r);
	}

	// theta = Math.atan2(y2 - y, x2 - x)	//* Collision Angle
	CalcCollisionAngle(collidor, collidee) {
		let pointOr = this.GetPoint(collidor),
			pointEe = this.GetPoint(collidee);

		return Math.atan2(pointEe.Y - pointOr.Y, pointEe.X - pointOr.X);
	}	

	Tick(time, entity) {}
}

export { Worlds };