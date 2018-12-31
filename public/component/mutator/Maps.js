import EnumComponentType from "../enum/ComponentType.js";
import EnumMapType from "../enum/MapType.js";
import EnumNavigabilityType from "../enum/NavigabilityType.js";

import { Mutator } from "./Mutator.js";
import { Map } from "../element/Map.js";

class Maps extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.MAPS);

		return comp;
	}

	GetMap(entity) {
		return this.FuzzyKnights.World.MapManager.FindMap(
			this.GetComponent(entity).ActiveMap.MapIdentifier
		);
	}	
	SetMap(entity, map) {
		let pos = map.GetDefaultSpawn();
		
		this.GetComponent(entity).ActiveMap = new Map(
			EnumMapType.TILE,
			pos.X,
			pos.Y,
			map.UUID
		);

		this.FuzzyKnights.Event.Spawn.EntityJoinWorldEvent(entity, map);

		return this;
	}

	GetPosition(entity) {
		return this.GetComponent(entity).ActiveMap.Heading.Position;
	}
	SetPosition(entity, x, y) {
		this.GetComponent(entity).ActiveMap.Heading.Position = this.FuzzyKnights.Utility.Physics.Position.Generate(x, y);

		return this;
	}

	GetRotation(entity) {
		return this.GetComponent(entity).ActiveMap.Heading.Rotation;
	}
	SetRotation(entity, r) {
		this.GetComponent(entity).ActiveMap.Heading.Rotation = this.FuzzyKnights.Utility.Physics.Rotation.Generate(r);

		return this;
	}

	GetHeading(entity) {
		return this.GetComponent(entity).ActiveMap.Heading;
	}
	SetHeading(entity, x, y, r = 0) {
		return this.GetComponent(entity).ActiveMap.Heading = this.FuzzyKnights.Utility.Physics.Heading.Generate(x, y, r);
	}

	GetVelocity(entity) {
		return this.GetComponent(entity).Velocity;
	}
	SetVelocity(entity, x = 0, y = 0, r = 0) {
		this.GetComponent(entity).Velocity = this.FuzzyKnights.Utility.Physics.Velocity.Generate(x, y, r);

		return this;
	}
	
	//TODO This could be a lot of processing per tick at scale, create an IsDirty flag in each component (at a minimum this one)
	CalcHeading(entity, time) {
		let pos = this.GetPosition(entity),
			vel = this.GetVelocity(entity),
			map = this.GetMap(entity);

		//? This part imposes the Navigability constraints of the Terrain on the Velocity (but does NOT overwrite the Entity's Velocity in the Component)
		let nav = this.ImposeNavigabilityConstraints(entity, map, pos, vel);
		vel = nav.Velocity;
		
		let x = this.FuzzyKnights.Utility.Functions.Clamp(pos.X + (vel.Vector.X * time), 0, map.Grid.XMax - 1),
			y = this.FuzzyKnights.Utility.Functions.Clamp(pos.Y + (vel.Vector.Y * time), 0, map.Grid.YMax - 1);

		let px = pos.X,
			py = pos.Y;

		return [ px, py, x, y ];
	}
	ImposeNavigabilityConstraints(entity, map = null, pos = null, vel = null) {
		pos = pos || this.GetPosition(entity);
		vel = vel || this.GetVelocity(entity);
		map = map || this.GetMap(entity);

		let terrain = map.GetNode(pos.X, pos.Y).GetTerrain()[0],
			nav = this.FuzzyKnights.Component.Mutator.TerrainInfo.GetNavigability(terrain),
			constraint = EnumNavigabilityType.GetConstraint(nav),
			vector = vel.Vector.GetValues().map(v => v * constraint);

		return {
			Terrain: terrain,
			Velocity: this.FuzzyKnights.Utility.Physics.Velocity.Generate(...vector, vel.Rotation.Yaw)
		};
	}

	AttemptMove(entity, map, x, y, nx, ny) {
		let curr = map.GetNode(x, y),
			next = map.GetNode(nx, ny),
			isEligible = true;
		
		if(curr.CompareId() === next.CompareId()) {
			this.SetPosition(entity, nx, ny);
		} else if(curr.CompareId() !== next.CompareId()) {
			let cNext = next.GetCreatures();

			cNext.forEach(creature => {
				if(entity.UUID !== creature.UUID) {
					isEligible = false;
				}
			});	

			if(isEligible) {
				this.SetPosition(entity, nx, ny);
			}		
		}
		map.UpdateNodeOccupancy(entity);

		return isEligible;
	}

	Move(entity, map, px, py, x, y) {
		let node = map.GetNode(x, y, false),
			isEligible = true;

		// node.GetEntityArray().forEach((v, i) => {
		// 	let isCollision = this.CheckCollision(entity, v);

		// 	if(isCollision) {
		// 		console.log(entity, v, true);
		// 	} else {
		// 		console.log(entity, v, false);
		// 	}
		// });
		this.SetPosition(entity, x, y);

		// this.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity.UUID, px, py, x, y);

		return this;
	}

	CheckCollisionBox(collidor, collidee) {
		let posOr = this.GetPosition(collidor),
			posEe = this.GetPosition(collidee),
			bbOr = Maps.CalcBoundingBox(posOr.X, posOr.Y, this.FuzzyKnights.Game.Settings.View.Tile.Width / 2, this.FuzzyKnights.Game.Settings.View.Tile.Height / 2),
			bbEe = Maps.CalcBoundingBox(posEe.X, posEe.Y, this.FuzzyKnights.Game.Settings.View.Tile.Width / 2, this.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

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

	CheckPointWithinBoundaryCircle(x, y, cx, cy, cr) {
		return (x - cx) ** 2 + (y - cy) ** 2 <= cr ** 2;
	}
	CheckPointWithinBoundaryBox(x, y, bx, by) {
		let bb = Maps.CalcBoundingBox(bx, by, this.FuzzyKnights.Game.Settings.View.Tile.Width / 2, this.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

		return (x <= bb.BRx) && (x >= bb.TLx) && (y <= bb.BRy) && (y >= bb.TLy);
	}
	CheckPointWithinEntityBox(entity, x, y) {
		let pos = this.GetPosition(entity),
			bb = Maps.CalcBoundingBox(pos.X, pos.Y, this.FuzzyKnights.Game.Settings.View.Tile.Width / 2, this.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

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
}

export { Maps };