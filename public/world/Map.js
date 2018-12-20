import Functions from "../utility/Functions.js";

import { Grid } from "../utility/Grid.js";
import { Node } from "./Node.js";
import { Position } from "../utility/physics/Position.js";

import { Grass } from "./../entity/terrain/Grass.js";

class Map {
	constructor(...args) {
		if(args.length === 1 && args[0] instanceof Grid) {
			this.Grid = args[0];
			this.Grid.SetType(Node);
			this.Grid.ForEach((pos, element, grid) => {
				//TODO "new Grass()" should be dynamically read from the input and converted into appropriate Terrain
				grid.Set(pos.X, pos.Y, new Node(pos.X, pos.Y, new Grass()));
			});
		} else {
			this.Grid = new Grid(args[0], args[1], Node, (x, y, t) => {
				return [x, y];
			});
		}

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