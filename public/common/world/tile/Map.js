import Functions from "../../utility/Functions.js";

import { GridXY } from "../../utility/GridXY.js";
import { Node } from "./Node.js";
import { Position } from "../../utility/physics/2D/Position.js";

class Map {
	constructor(xmax, ymax) {
		this.Grid = new GridXY(xmax, ymax, Node, (x, y, t) => {
			return [x, y];
		});

		this.HasCreatures = false;
		this.DefaultSpawn = new Position(0, 0);
		this.UUID = Functions.NewUUID();
	}
	
	GetDefaultSpawn() {
		return this.DefaultSpawn;
	}
	SetDefaultSpawn(x, y) {
		this.DefaultSpawn.Set(x, y);

		return this;
	}

	GetNode(x, y) {
		return this.Grid.Get(x, y);
	}
	SetNode(x, y, node) {
		this.Grid.Set(x, y, node);

		return this;
	}

	/**
	 * This will check each node in the Grid and call .RemoveEntity()
	 * @param Entity entity 
	 */
	DeepRemove(entity) {
		this.Grid.ForEach((p, n, t) => {
			n.RemoveEntity(entity);
		});

		return this;
	}

	CheckCreatures() {
		this.Grid.ForEach((p, e, t) => {
			this.HasCreatures = this.HasCreatures || e.IsOccupied();
		});

		return this;
	}
	IsOccupied() {
		return this.HasCreatures;
	}

	PlaceEntity(entity, x, y) {
		this.DeepRemove(entity);
		let n = this.GetNode(Math.floor(x), Math.floor(y));

		n.AddEntity(entity);

		return this;
	}
	MoveEntity(entity, x0, y0, x1, y1) {
		//TODO Set move constraints within here
		let n0 = this.GetNode(Math.floor(x0), Math.floor(y0)),
			n1 = this.GetNode(Math.floor(x1), Math.floor(y1));

		n0.RemoveEntity(entity);
		n1.AddEntity(entity);

		return this;
	}
}

export { Map };