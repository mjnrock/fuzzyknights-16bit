import ElementMap from "../utility/ElementMap.js";
import PolyElementMap from "../utility/PolyElementMap.js";
import { NewUUID, ClampCeiling } from "./../utility/Functions.js";

import Entity from "./../entity/package.js";

class Zone {
	constructor(width, height) {
		if(width instanceof Zone) {
			let zone = width;
			this.Terrain = zone.Terrain;
			this.Entities = zone.Entities;
			this.Width = zone.Terrain.Width;
			this.Height = zone.Terrain.Height;

			this.UUID = zone.UUID || NewUUID();
		} else if(width instanceof ElementMap) {
			let eleMap = width;
			this.Terrain = eleMap;
			this.Entities = new PolyElementMap(eleMap.Width, eleMap.Height);
			this.Width = eleMap.Width;
			this.Height = eleMap.Height;

			this.UUID = NewUUID();
		} else {
			this.Width = width;
			this.Height = height;

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
			this.Terrain.Remove(x0, y0);
			this.Terrain.Set(x1, y1, terrain);
		}
	}
	UpdateEntityMap(entity, x0, y0, x1, y1) {
		if(~~x0 !== ~~x1 || ~~y0 !== ~~y1) {
			this.Entities.RemoveElement(x0, y0, entity.UUID);
			this.Entities.AddElement(x1, y1, entity);
		}
	}

	PlaceEntity(entity, x, y) {
		Zone.FuzzyKnights.Event.Spawn.EntityMoveEvent(this, entity, -1, -1, x, y);

		return this;
	}

	Move(entity, x0, y0, x1, y1, isDeltaMove = false) {
		if(isDeltaMove) {
			x1 = x0 + x1;
			y1 = y0 + y1;
		}
		Zone.FuzzyKnights.Event.Spawn.EntityMoveEvent(this, entity, x0, y0, x1, y1);

		return this;
	}

	ApplyPhysics(entity, pos) {
		let terrain = this.Terrain.Get(pos.X, pos.Y);

		if(terrain) {
			let veloc = Zone.FuzzyKnights.Component.Mutator.Physics.GetVelocity(entity),
				vt = Zone.FuzzyKnights.Component.Mutator.TerrainInfo.GetNavigabilityConstraint(terrain);

			// console.log(veloc.X.Get(), veloc.Y.Get(), vt * Zone.FuzzyKnights.Game.GameManager.GameLoop.LastTimeStep / 10000);
			// veloc.X.Subtract(vt * Zone.FuzzyKnights.Game.GameManager.GameLoop.LastTimeStep / 10000);
			// veloc.Y.Subtract(vt * Zone.FuzzyKnights.Game.GameManager.GameLoop.LastTimeStep / 10000);

			// Zone.FuzzyKnights.Component.Mutator.Physics.SetVelocity(entity, Zone.FuzzyKnights.Physics.D2.Velocity.Generate(dvx, dvy));
			// Zone.FuzzyKnights.Component.Mutator.Physics.AddForce(entity, Zone.FuzzyKnights.Physics.D2.Force.Generate(-Fx, -Fy));
			// Zone.FuzzyKnights.Component.Mutator.Physics.GetAcceleration(entity).Merge(Zone.FuzzyKnights.Physics.D2.Acceleration.Generate(dvx, dvy));
		}
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