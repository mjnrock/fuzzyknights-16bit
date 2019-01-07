import ElementMap from "../utility/ElementMap.js";
import PolyElementMap from "../utility/PolyElementMap.js";
import { NewUUID } from "./../utility/Functions.js";

class Zone {
	constructor(width, height) {
		this.Terrain = new ElementMap(width, height);
		this.Entities = new PolyElementMap(width, height);

		this.UUID = NewUUID();
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