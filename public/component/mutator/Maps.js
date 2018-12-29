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
		this.SetPosition(entity, x, y);
		// this.Move(entity, x, y);

		return [ px, py, x, y ];
	}

	GetVelocity(entity) {
		return this.GetComponent(entity).Velocity;
	}
	SetVelocity(entity, x = 0, y = 0, r = 0) {
		this.GetComponent(entity).Velocity = this.FuzzyKnights.Utility.Physics.Velocity.Generate(x, y, r);

		return this;
	}
	
	ImposeNavigabilityConstraints(entity, map = null, pos = null, vel = null) {
		pos = pos || this.GetPosition(entity);
		vel = vel || this.GetVelocity(entity);
		map = map || this.GetMap(entity);

		let terrain = map.GetNode(pos.X + 0.5, pos.Y + 0.5).GetTerrain()[0],
			nav = this.FuzzyKnights.Component.Mutator.TerrainInfo.GetNavigability(terrain),
			constraint = EnumNavigabilityType.GetConstraint(nav),
			vector = vel.Vector.GetValues().map(v => v * constraint);

		return {
			Terrain: terrain,
			Velocity: this.FuzzyKnights.Utility.Physics.Velocity.Generate(...vector, vel.Rotation.Yaw)
		};
	}

	Place(entity, x0, y0, x1, y1) {
		let map = this.GetMap(entity);
		map.MoveEntity(entity, x0, y0, x1, y1);

		return this;
	}

	Move(entity, x, y) {
		//TODO While Key State is ACTIVE, set Component's Directional Velocity to "Navigability Speed",
		//TODO let either some .Tick() use the LastTickTime to calculate how far Entity should move based on that velocity and elapsed time
		// let map = this.GetMap(entity);

		// this.FuzzyKnights.Event.Spawn.EntityMoveEvent(entity.UUID, x1, y1);

		return this;
	}

	CheckCollision(entity, x, y) {
		if(entity instanceof this.FuzzyKnights.Entity) {
			console.log(111);
		}
		let pos = this.GetPosition(entity),
			bb = Maps.CalcBoundingBox(x, y, this.FuzzyKnights.Game.Settings.View.Tile.Width / 2, this.FuzzyKnights.Game.Settings.View.Tile.Height / 2);

		return (pos.X <= bb.BRx) && (pos.X >= bb.TLx) && (pos.Y <= bb.BRy) && (pos.Y >= bb.TLy);
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