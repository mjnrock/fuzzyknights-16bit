import ElementMap from "../utility/ElementMap.js";
import PolyElementMap from "../utility/PolyElementMap.js";
import { NewUUID } from "./../utility/Functions.js";

class Zone {
	constructor(width, height) {
		this.Terrain = new ElementMap(width, height);
		this.Entities = new PolyElementMap(width, height);

		this.UUID = NewUUID();
	}

	UpdateTerrainMap(terrain, x0, y0, x1, y1) {
		if(~~x0 !== ~~x1 || ~~y0 !== ~~y1) {
			this.Terrain.RemoveElement(x0, y0, terrain);
			this.Terrain.AddElement(x1, y1, terrain);
		}
	}
	UpdateEntityMap(entity, x0, y0, x1, y1) {
		if(~~x0 !== ~~x1 || ~~y0 !== ~~y1) {
			this.Entities.RemoveElement(x0, y0, entity);
			this.Entities.AddElement(x1, y1, entity);
		}
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

	//? @protagonist is a Player's Entity
	Tick(time, protagonist) {
		let protPos = Zone.FuzzyKnights.Component.Mutator.Worlds.GetPosition(protagonist),
			dist = 5;

		this.Entities.ForEachNeighbor(protPos.X, protPos.Y, dist, (pos, entities, em) => {
			em.ForEachElement(pos.X, pos.Y, (ePos, entity, eNode, pem) => {

				//*	Add any further constraints here

				entity.Tick(time);
			});
		});
	}
}

export { Zone };