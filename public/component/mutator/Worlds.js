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

	GetPoint(entity) {
		return this.GetComponent(entity).Heading.Point;
	}
	SetPoint(entity, x, y) {
		this.GetComponent(entity).Heading.Point = this.FuzzyKnights.Module.Physics.D2.Point.Generate(x, y);

		return this;
	}

	GetAngle(entity) {
		return this.GetComponent(entity).Heading.Angle;
	}
	SetAngle(entity, r) {
		this.GetComponent(entity).Heading.Angle = this.FuzzyKnights.Module.Physics.D2.Angle.Generate(r);

		return this;
	}

	GetHeading(entity) {
		return this.GetComponent(entity).Heading;
	}
	SetHeading(entity, x, y, r = 0) {
		return this.GetComponent(entity).Heading = this.FuzzyKnights.Module.Physics.D2.Orientation.Generate(x, y, r);
	}

	// theta = Math.atan2(y2 - y, x2 - x)	//* Collision Angle
	CalcCollisionAngle(collidor, collidee) {
		let pointOr = this.GetPoint(collidor),
			pointEe = this.GetPoint(collidee);

		return Math.atan2(pointEe.Y - pointOr.Y, pointEe.X - pointOr.X);
	}

	//TODO F=mass*(v2 - v1)/time	//* Collision Forces
	//TODO Fx=F*Math.cos(theta)
	//TODO Fy=F*Math.sin(theta)
	//TODO Force.Generate(Fx, Fy)
	//TODO EntityCollisionEvent adds +Force.Generate(Fx, Fy) to Collidee and -Force.Generate(Fx, Fy) to Collidor

	//TODO Ax=Fx/mass	//* Acceleration when Forced
	

	Tick(time, entity) {
		//TODO Process all Forces
		//TODO Process all Acceleration
		//TODO Process all Velocity
		//TODO Process all Displacements
		//TODO Apply any Displacements to Entity
		//TODO Reduce all Accelerations by GLOBAL amount for Gravity/Friction (Tend negative and positive magnitudes toward 0 via Universal Friction)
	}
}

export { Worlds as Maps };