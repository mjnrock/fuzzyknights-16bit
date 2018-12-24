import Functions from "../utility/Functions.js";

import { Grid } from "../utility/Grid.js";
import { Node } from "./Node.js";
import { Position } from "../utility/physics/Position.js";

import Terrain from "./../entity/terrain/package.js";

class Map {
	constructor(...args) {
		if(args.length === 1 && args[0] instanceof Grid) {
			this.Grid = args[0];
			this.Grid.SetType(Node);
			this.Grid.ForEach((pos, element, grid) => {
				//TODO "new Grass()" should be dynamically read from the input and converted into appropriate Terrain
				let terrain = Math.random() > 0.5 ? new Terrain.Grass() : new Terrain.Sand();
				grid.Set(pos.X, pos.Y, new Node(pos.X, pos.Y, terrain));
			});
		} else {
			this.Grid = new Grid(args[0], args[1], Node, (x, y, t) => {
				return [x, y];
			});
		}

		//TODO Pull the seed numbers from the Settings
		this.Tile = {
			Width: 128,
			Height: 128
		};

		this.HasCreatures = false;
		this.DefaultSpawn = new Position(0, 0);
		this.UUID = Functions.NewUUID();
	}

	/**
	 * Use if [x, y] is a pixel-like coordinate (e.g. [423, 1123])
	 * @param {number} x 
	 * @param {number} y 
	 */
	ConvertNonNormalizedToTilePosition(x, y) {
		return {
			X: Math.floor(x / this.Tile.Width),
			Y: Math.floor(y / this.Tile.Height)
		};
	}
	/**
	 * Use if [x, y] is a map-like coordinate (e.g. [2.123, 1.156])
	 * @param {number} x 
	 * @param {number} y 
	 */
	ConvertNormalizedToTilePosition(x, y) {
		return {
			X: Math.floor(x),
			Y: Math.floor(y)
		};
	}
	
	GetDefaultSpawn() {
		return this.DefaultSpawn;
	}
	SetDefaultSpawn(x, y) {
		this.DefaultSpawn.Set(x, y);

		return this;
	}

	GetNode(x, y, isNormalized = true) {
		let pos = this.ConvertNormalizedToTilePosition(x, y);
		
		if(!isNormalized) {
			pos = this.ConvertNonNormalizedToTilePosition(x, y);
		}

		x = pos.X;
		y = pos.Y;

		return this.Grid.Get(x, y);
	}
	SetNode(x, y, node, isNormalized = true) {
		let pos = this.ConvertNormalizedToTilePosition(x, y);
		
		if(!isNormalized) {
			pos = this.ConvertNonNormalizedToTilePosition(x, y);
		}

		x = pos.X;
		y = pos.Y;
		
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