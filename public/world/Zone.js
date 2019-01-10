import ElementMap from "../utility/ElementMap.js";
import PolyElementMap from "../utility/PolyElementMap.js";
import { NewUUID, ClampCeiling } from "./../utility/Functions.js";

class Zone {
	constructor(width, height) {
		if(width instanceof Zone) {
			let zone = width;
			this.Terrain = zone.Terrain;
			this.Entities = zone.Entities;
			this.UUID = zone.UUID || NewUUID();
		} else if(width instanceof ElementMap) {
			let eleMap = width;
			this.Terrain = eleMap;
			this.Entities = new PolyElementMap(eleMap.Width, eleMap.Height);

			this.UUID = NewUUID();
		} else {
			this.Terrain = new ElementMap(width, height);
			this.Entities = new PolyElementMap(width, height);

			this.UUID = NewUUID();
		}
	}

	Get(x, y) {
		return {
			Terrain: this.Terrain.Get(x, y),
			Entities: this.Entities.Get(x, y)
		}
	}

	UpdateTerrainMap(terrain, x0, y0, x1, y1) {
		if(~~x0 !== ~~x1 || ~~y0 !== ~~y1) {
			this.Terrain.RemoveElement(x0, y0, terrain.UUID);
			this.Terrain.AddElement(x1, y1, terrain);
		}
	}
	UpdateEntityMap(entity, x0, y0, x1, y1) {
		if(~~x0 !== ~~x1 || ~~y0 !== ~~y1) {
			this.Entities.RemoveElement(x0, y0, entity.UUID);
			this.Entities.AddElement(x1, y1, entity);
		}
	}

	PlaceEntity(entity, x, y) {
		if(x0 !== x1 && y0 !== y1) {
			this.UpdateEntityMap(entity, x0, y0, x1, y1);
			Zone.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity, x0, y0, x1, y1);

			return true;
		}

		return false;
	}

	Move(entity, x0, y0, x1, y1) {
		if(x0 !== x1 && y0 !== y1) {
			this.UpdateEntityMap(entity, x0, y0, x1, y1);
			Zone.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity, x0, y0, x1, y1);

			return true;
		}

		return false;
	}
	Displace(entity, x0, y0, displacement) {
		let dx = displacement.X,
			dy = displacement.Y,
			x1 = x0 + dx,
			y1 = y0 + dy;

		return this.Move(entity, x0, y0, x1, y1);
	}

	ApplyPhysics(entity, pos) {
		let terrain = this.Terrain.Get(pos.X, pos.Y),
			mass = Zone.FuzzyKnights.Component.Mutator.Physics.GetMass(entity),
			[ vx, vy ] = Zone.FuzzyKnights.Component.Mutator.Physics.GetVelocity(entity).Get(),
			vt = Zone.FuzzyKnights.Component.Mutator.TerrainInfo.GetNavigabilityConstraint(terrain);

		let Fx = ClampCeiling(vx - vt, 0) * mass,
			Fy = ClampCeiling(vy - vt, 0) * mass;

		// Zone.FuzzyKnights.Component.Mutator.Physics.SetVelocity(entity, Zone.FuzzyKnights.Physics.D2.Velocity.Generate(dvx, dvy));
		// Zone.FuzzyKnights.Component.Mutator.Physics.AddForce(entity, Zone.FuzzyKnights.Physics.D2.Force.Generate(-Fx, -Fy));
		// Zone.FuzzyKnights.Component.Mutator.Physics.GetAcceleration(entity).Merge(Zone.FuzzyKnights.Physics.D2.Acceleration.Generate(dvx, dvy));
	}

	//? @protagonist is a Player's Entity
	Tick(time, protagonist) {
		let protPos = Zone.FuzzyKnights.Component.Mutator.Worlds.GetPoint(protagonist),
			dist = 5;

		// this.ApplyPhysics(protagonist, protPos);
		this.Entities.ForEachNeighbor(protPos.X, protPos.Y, dist, (pos, entities, em) => {
			em.ForEachElement(pos.X, pos.Y, (ePos, entity, eNode, pem) => {
				// this.ApplyPhysics(entity, protPos);
				entity.Tick(time);
			});
		});
	}

	static Generate(width, height) {
		return new Zone(width, height);
	}
}

export { Zone };