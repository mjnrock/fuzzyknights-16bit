import Position from "../utility/physics/Position.js";
import OrderedList from "../utility/OrderedList.js";

import { Terrain } from "../entity/terrain/Terrain.js";
import { Creature } from "../entity/creature/Creature.js";

class Node {
	constructor(x, y, entities = null) {
		this.Location = new Position(x, y);
		this.Entities = new OrderedList(entities);
	}

	GetLocation() {
		return this.Location;
	}
	SetLocation(x, y) {
		this.Location = new Position(x, y);

		return this;
	}

	AddEntity(entity) {
		if(!this.Entities.Contains(entity)) {
			this.Entities.Push(entity);
		}

		return this;
	}
	RemoveEntity(entity) {
		let len = this.Entities.Size();
		this.Entities = this.Entities.RemoveByValue(entity, (e, nodes, t) => {
			return nodes.filter((v) => {
				return v.v.UUID !== e.UUID;
			});
		});

		return len > this.Entities.Size();
	}

	/**
	 * Used to extract a particular Class of Entity
	 * @param Class type 
	 */
	GetEntitySubClass(type) {
		let ret = this.Entities.ToArray().filter((v) => v instanceof type);

		return ret.length > 0 ? ret : [];
	}
	GetCreatures() {
		return this.GetEntitySubClass(Creature);	// Creature is the import class above
	}
	GetTerrain() {
		return this.GetEntitySubClass(Terrain);		// Terrain is the import class above
	}
	//TODO "Item" and "Portal" not completed yet
	// GetItems() {
	// 	return this.GetEntitySubClass(Item);
	// }
	// GetPortals() {
	// 	return this.GetEntitySubClass(Portal);
	// }

	GetPosition() {
		return this.Location.GetValues();
	}

	GetEntityArray() {
		return this.Entities.ToArray();
	}
}

export { Node };