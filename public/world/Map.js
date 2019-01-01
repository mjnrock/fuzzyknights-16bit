import Functions from "../utility/Functions.js";

import Grid from "../utility/Grid.js";
import { Node } from "./Node.js";
import Position from "../utility/physics/Position.js";

class Map {
	constructor(...args) {
		if(args.length === 1 && args[0] instanceof Grid) {
			this.Grid = args[0];
		} else {
			this.Grid = new Grid(args[0], args[1], Node, (x, y) => [ x, y ]);
		}
		
		//	Compensating for X, Y = 0
		this.XMax = this.Grid.XMax - 1;
		this.YMax = this.Grid.YMax - 1;

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
			X: Math.floor(x / Map.FuzzyKnights.Game.Settings.View.Tile.Width),
			Y: Math.floor(y / Map.FuzzyKnights.Game.Settings.View.Tile.Height)
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

	UpdateNodeOccupancy(entity, nx, ny) {
		let node = this.GetNode(nx, ny);

		if(!node.HasEntity(entity)) {
			this.DeepRemove(entity);
			node.AddEntity(entity);
		}

		return this;
	}


	
	
	//TODO This could be a lot of processing per tick at scale, create an IsDirty flag in each component (at a minimum this one)
	CalcHeading(entity, time) {
		let pos = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity),
			vel = Map.FuzzyKnights.Component.Mutator.Maps.GetVelocity(entity),
			map = Map.FuzzyKnights.Component.Mutator.Maps.GetMap(entity);

		//? This part imposes the Navigability constraints of the Terrain on the Velocity (but does NOT overwrite the Entity's Velocity in the Component)
		let nav = this.ImposeNavigabilityConstraints(entity, map, pos, vel);
		vel = nav.Velocity;
		
		let x = Map.FuzzyKnights.Utility.Functions.Clamp(pos.X + (vel.Vector.X * time), 0, map.Grid.XMax - 1),
			y = Map.FuzzyKnights.Utility.Functions.Clamp(pos.Y + (vel.Vector.Y * time), 0, map.Grid.YMax - 1);

		let px = pos.X,
			py = pos.Y;

		return [ px, py, x, y ];
	}
	ImposeNavigabilityConstraints(entity, map = null, pos = null, vel = null) {
		pos = pos || Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity);
		vel = vel || Map.FuzzyKnights.Component.Mutator.Maps.GetVelocity(entity);
		map = map || Map.FuzzyKnights.Component.Mutator.Maps.GetMap(entity);

		let terrain = map.GetNode(pos.X, pos.Y).GetTerrain()[0],
			nav = Map.FuzzyKnights.Component.Mutator.TerrainInfo.GetNavigability(terrain),
			constraint = Map.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(nav),
			vector = vel.Vector.GetValues().map(v => v * constraint);

		return {
			Terrain: terrain,
			Velocity: Map.FuzzyKnights.Utility.Physics.Velocity.Generate(...vector, vel.Rotation.Yaw)
		};
	}

	static GetPerimeterPoints(j, k, r) {
		let points = [];

		for(let t = 0; t < 360; t++) {
			let x = r * Math.cos(t) + j,
				y = r * Math.sin(t) + k;

			points.push([ x, y ]);
		}

		return points;
	}
	static GetNeighborsBox(x, y, d) {
		let tx = ~~x,
			ty = ~~y,
			r = d,
			points = [];
		
		for(let i = tx - r; i <= tx + r; i++) {
			for(let j = ty - r; j <= ty + r; j++) {
				points.push([ i, j ]);
			}
		}

		return points;
	}

	AttemptMove(entity, map, nx, ny) {
		let pos = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity),
			neighbors = Map.GetNeighborsBox(nx, ny, 1),
			isCollisionFree = true;

		for(let i in neighbors) {
			let neigh = neighbors[i],
				xc = ~~neigh[0],
				yc = ~~neigh[1];

			if(xc >= 0 && xc <= this.XMax && yc >= 0 && yc <= this.YMax) {
				let node = map.GetNode(xc, yc),
					creatures = node.GetCreatures();

				for(let c in creatures) {
					let creature = creatures[c];

					if(entity.UUID !== creature.UUID && this.CheckCollision(entity, creature)) {
						Map.FuzzyKnights.Event.Spawn.EntityCollisionEvent(entity, creature);
						isCollisionFree = false;
					}
				}
			}
		}

		if(isCollisionFree) {
			Map.FuzzyKnights.Component.Mutator.Maps.SetPosition(entity, nx, ny);
			map.UpdateNodeOccupancy(entity, nx, ny);
		} else {
			let dx = pos.X - nx,
				dy = pos.Y - ny,
				dnx = pos.X + dx,
				dny = pos.Y + dy;

			Map.FuzzyKnights.Component.Mutator.Maps.SetPosition(entity, dnx, dny);
			map.UpdateNodeOccupancy(entity, dnx, dny);
		}

		return isCollisionFree;
	}

	CheckCollision(collidor, collidee) {
		let posOr = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(collidor),
			posEe = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(collidee),
			maskOr = Map.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(collidor),
			maskEe = Map.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(collidee),

			xOr = posOr.X + maskOr.Origin.X,
			yOr = posOr.Y + maskOr.Origin.Y,
			xEe = posEe.X + maskEe.Origin.X,
			yEe = posEe.Y + maskEe.Origin.Y,

			isCollision = Math.hypot(xOr - xEe, yOr - yEe) <= (maskOr.Radius + maskEe.Radius) / Map.FuzzyKnights.Game.Settings.View.Tile.Target;

		return isCollision;
	}

	CheckCollisionBox(collidor, collidee) {
		let posOr = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(collidor),
			posEe = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(collidee),
			bbOr = Maps.CalcBoundingBox(posOr.X, posOr.Y, Map.FuzzyKnights.Game.Settings.View.Tile.Width / 2, Map.FuzzyKnights.Game.Settings.View.Tile.Height / 2),
			bbEe = Maps.CalcBoundingBox(posEe.X, posEe.Y, Map.FuzzyKnights.Game.Settings.View.Tile.Width / 2, Map.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

		for(let x = bbOr.TLx; x <= bbOr.BRx; x++) {
			for(let y = bbOr.BRy; y <= bbOr.TLy; y++) {
				let isCollision = (x <= bbEe.BRx) && (x >= bbEe.TLx) && (y <= bbEe.BRy) && (y >= bbEe.TLy);

				if(isCollision) {
					return true;
				}
			}
		}

		return false;
	}

	IsPointWithinPolygon(x, y, poly) {
		let inside = false;
		
		for(let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
			let xi = poly[i][0],
				yi = poly[i][1],
				xj = poly[j][0],
				yj = poly[j][1];

			let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

			if(intersect) {
				inside = !inside;
			}
		}

		return inside;
	}
	IsPointWithinCircle(x, y, cx, cy, cr) {
		return (x - cx) ** 2 + (y - cy) ** 2 <= cr ** 2;
	}

	CheckPointWithinBoundingBox(x, y, bx, by) {
		let bb = Maps.CalcBoundingBox(bx, by, Map.FuzzyKnights.Game.Settings.View.Tile.Width / 2, Map.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

		return (x <= bb.BRx) && (x >= bb.TLx) && (y <= bb.BRy) && (y >= bb.TLy);
	}

	CheckPointWithinEntityBox(entity, x, y) {
		let pos = Map.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity),
			bb = Maps.CalcBoundingBox(pos.X, pos.Y, Map.FuzzyKnights.Game.Settings.View.Tile.Width / 2, Map.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

		return (x <= bb.BRx) && (x >= bb.TLx) && (y <= bb.BRy) && (y >= bb.TLy);
	}
	CheckPointWithinEntityCircle(entity, x, y) {
		return (x - cx) ** 2 + (y - cy) ** 2 <= cr ** 2;
	}
	
	/**
	 * This will create a rectangle by creating a point at (x, y) and then expand 4-directionally
	 * to create the bounding region Top Left = (x - rx, y - ry), Bottom Right = (x + rx, y + ry)
	 * 
	 * NOTE: Interpret "radius" from an inscribed-circle perspective, not circumscribed
	 * @param {number} x | Center Point X
	 * @param {number} y | Center Point Y
	 * @param {number} rx | The "X Radius"
	 * @param {number} ry | The "Y Radius"
	 */
	//! In the absence of a true collision mask system (e.g. AABB), this is simplistically substituting ALL collision mask calculations
	static CalcBoundingBox(x, y, rx, ry = rx) {
		return {
			TLx: x - rx,
			TLy: y - ry,
			BRx: x + rx,
			BRy: y + ry
		};
	}

	Tick(time) {
		this.Grid.ForEach((pos, ele, grid) => {
			let creats = ele.GetCreatures();

			if(creats.length > 0) {
				creats.forEach(ent => {
					if(Map.FuzzyKnights.Component.Mutator.Maps.GetVelocity(ent).HasVelocity()) {
						let pos = this.CalcHeading(ent, time);
			
						if(pos[0] !== pos[2] || pos[1] !== pos[3]) {
							Map.FuzzyKnights.Event.Spawn.EntityMoveEvent(ent.UUID, ...pos);
						}
					}
				});
			}
		});
	}
}

export { Map };