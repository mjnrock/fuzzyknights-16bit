import Canvas from "./Canvas.js";

// It is generally implied that there only will ever be 1 instance of this at a time, treat as such
class DebugView {
	constructor(fk, name = "debug") {
		this.FuzzyKnights = fk;
		this.Canvas = new Canvas(name);
	}

	Render(time) {
		this.Canvas.PreDraw();

		if(this.FuzzyKnights.Common.Game.Settings.View.DebugMode) {
			this.DrawDetails();
		}		
		
		return this.Canvas;
	}

	DrawDetails() {
		let player = this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity(),
			compWorlds = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetComponent(player),
			compPhysics = this.FuzzyKnights.Common.Component.Mutator.Physics.GetComponent(player),
			zone = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetZone(player),
			[ posX, posY ] = [ compWorlds.Heading.Point.X, compWorlds.Heading.Point.Y ],
			node = zone.Get(compWorlds.Heading.Point.X, compWorlds.Heading.Point.Y);
			
		this.Canvas.Context.fillStyle = "rgba(0, 0, 0, 0.95)";
		this.Canvas.Context.fillRect(
			0,
			0,
			this.Canvas.Width,
			150
		);
		this.Canvas.Context.fillStyle = "rgba(255, 255, 255, 1.0)";
		this.Canvas.Context.font = "10pt monospace";

		let row = (r = 0) => (r + 1) * 16,
			col = (c = 1, fudge = 0) => {
				if(typeof fudge === "string" || fudge instanceof String) {
					fudge = ~~(this.Canvas.Context.measureText(fudge).width / 2);
				}

				return (c - 1) * 250 + 10 + fudge;
			},
			rowg = function*(r = 0) {
				while(true) {
					r++;
					yield r * 16;
				}
			};
		
		let r1 = rowg();
		this.Canvas.Context.fillText(`[ PLAYER ]`, col(1, `[ PLAYER ]`), r1.next().value);
		this.Canvas.Context.fillText(`Acceleration: ${ compPhysics.Kinetics.Kinematics.Acceleration.X.toFixed(2) }ts, ${ compPhysics.Kinetics.Kinematics.Acceleration.Y.toFixed(2) }ts, ${ compPhysics.Kinetics.Kinematics.Acceleration.Angle.Theta }rs`, col(1), r1.next().value);
		this.Canvas.Context.fillText(`Velocity: ${ compPhysics.Kinetics.Kinematics.Velocity.X.toFixed(2) }ts, ${ compPhysics.Kinetics.Kinematics.Velocity.Y.toFixed(2) }ts, ${ compPhysics.Kinetics.Kinematics.Velocity.Angle.Theta }rs`, col(1), r1.next().value);
		this.Canvas.Context.fillText(`Position: ${ compWorlds.Heading.Point.X.toFixed(2) }x, ${ compWorlds.Heading.Point.Y.toFixed(2) }y`, col(1), r1.next().value);
		this.Canvas.Context.fillText(`Facing: ${ compWorlds.Heading.Angle.Theta }°`, col(1), r1.next().value);
		this.Canvas.Context.fillText(
			`Mask: ${
				(compWorlds.Heading.Point.X + (compPhysics.CollisionMask.Origin.X / this.FuzzyKnights.Common.Game.Settings.View.Tile.Target)).toFixed(2)
			}, ${
				(compWorlds.Heading.Point.Y + (compPhysics.CollisionMask.Origin.Y / this.FuzzyKnights.Common.Game.Settings.View.Tile.Target)).toFixed(2)
			}, ${
				compPhysics.CollisionMask.Radius
			}`,
			col(1),
			r1.next().value
		);
		this.Canvas.Context.fillText(`- Type: ${ compPhysics.CollisionMask.constructor.name.replace(/CollisionMask/gi, "") }`, col(1), r1.next().value);
		this.Canvas.Context.fillText(`- XYR: ${ compPhysics.CollisionMask.Origin.X }px, ${ compPhysics.CollisionMask.Origin.Y }px, ${ compPhysics.CollisionMask.Radius }px`, col(1), r1.next().value);
		
		let terrain = node.Terrain;				
		if(terrain && this.FuzzyKnights.Common.Component.Mutator.TerrainInfo.HasComponent(terrain)) {
			let compTerInf = this.FuzzyKnights.Common.Component.Mutator.TerrainInfo.GetComponent(terrain);
			let r2 = rowg();
			this.Canvas.Context.fillText(`[ TERRAIN ]`, col(2, `[ TERRAIN ]`), r2.next().value);
			this.Canvas.Context.fillText(`Tile: ${ ~~compWorlds.Heading.Point.X }, ${ ~~compWorlds.Heading.Point.Y }`, col(2), r2.next().value);
			this.Canvas.Context.fillText(`Type: ${ this.FuzzyKnights.Common.Component.Enum.TerrainType.Lookup(compTerInf.TerrainType) }`, col(2), r2.next().value);
			this.Canvas.Context.fillText(`- Meta: ${ compTerInf.Meta }`, col(2), r2.next().value);
			this.Canvas.Context.fillText(`Nav: ${ this.FuzzyKnights.Common.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability).toFixed(2) }`, col(2), r2.next().value);
			this.Canvas.Context.fillText(`- Type: ${ this.FuzzyKnights.Common.Component.Enum.NavigabilityType.Lookup(compTerInf.Navigability) }`, col(2), r2.next().value);
		}

		let r3 = rowg();
		this.Canvas.Context.fillText(`[ GAME ]`, col(3, `[ GAME ]`), r3.next().value);
		this.Canvas.Context.fillText(`ViewPort: ${ this.Canvas.Width }px, ${ this.Canvas.Height }px`, col(3), r3.next().value);
		this.Canvas.Context.fillText(`Camera: ${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.Canvas.Width }px, ${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.Canvas.Height }px | ${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.IsTracking ? "FOLLOW" : "STATIONARY" }`, col(3), r3.next().value);
		this.Canvas.Context.fillText(`- Detail: ${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.X.toFixed(2) }x, ${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.Y.toFixed(2) }y, r=[${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.Radius.Width },${ this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.Radius.Height }]`, col(3), r3.next().value);

		this.Canvas.Context.fillText(`Ticks: ${ this.FuzzyKnights.Common.Game.GameManager.GameLoop.Ticks }`, col(3), r3.next().value);
		this.Canvas.Context.fillText(`- FPS: ${ this.FuzzyKnights.Common.Game.GameManager.GameLoop.TicksPerSecond.toFixed(1) }`, col(3), r3.next().value);
		this.Canvas.Context.fillText(`Renders: ${ this.FuzzyKnights.Common.Game.GameManager.GameLoop.Renders }`, col(3), r3.next().value);
		this.Canvas.Context.fillText(`- FPS: ${ (1000 / this.FuzzyKnights.Common.Game.GameManager.GameLoop.LastRenderTime).toFixed(1) }`, col(3), r3.next().value);
		this.Canvas.Context.fillText(`- AFPS: ${ (this.FuzzyKnights.Common.Game.GameManager.GameLoop.Renders / (this.FuzzyKnights.Common.Game.GameManager.GameLoop.RenderTime / 1000)).toFixed(1) }`, col(3), r3.next().value);
	}

	


	DrawDebugWindow() {
		//DEBUG
		let player = this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity(),
			compWorlds = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetComponent(player),
			compPhysics = this.FuzzyKnights.Common.Component.Mutator.Physics.GetComponent(player),
			zone = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetZone(player),
			[ posX, posY ] = [ compWorlds.Heading.Point.X, compWorlds.Heading.Point.Y ],
			node = zone.Get(compWorlds.Heading.Point.X, compWorlds.Heading.Point.Y);

		// ? Highlight the Tile of the Player
		// {
		// 	this.Canvas.Context.fillStyle = "rgba(0, 0, 0, 0.15)";
		// 	this.Canvas.Context.fillRect(
		// 		tx - this.FuzzyKnights.Common.Game.Settings.View.Tile.Target / 2,
		// 		ty - this.FuzzyKnights.Common.Game.Settings.View.Tile.Target / 2,
		// 		this.FuzzyKnights.Common.Game.Settings.View.Tile.Width,
		// 		this.FuzzyKnights.Common.Game.Settings.View.Tile.Height
		// 	);
		// }

		// ? Entity Collision Mask
		// {
		// 	node.Entities.forEach(ent => {
		// 		let tare = this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.GetTare();

		// 		zone.Entities.ForEachNeighbor(tare.X, tare.Y, tare.R + 1, (pos, entities, em) => {
		// 			for(let i in entities) {
		// 				let ent = entities[i];

		// 				if(ent) {
		// 					let mask = this.FuzzyKnights.Common.Component.Mutator.Physics.GetCollisionMask(ent),
		// 						ecWorlds = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetComponent(ent),
		// 						[ tx, ty ] = [ ecWorlds.Heading.Point.X, ecWorlds.Heading.Point.Y ];

		// 					this.Canvas.Context.beginPath();
		// 					this.Canvas.Context.arc(
		// 						(tx - tare.Xl + mask.Origin.X) * 128 + (128 + 16 + 2),
		// 						(ty - tare.Yl + mask.Origin.Y) * 128 + (4),
		// 						mask.Radius,
		// 						0,
		// 						2 * Math.PI
		// 					);
		// 					this.Canvas.Context.lineWidth = 2;
		// 					this.Canvas.Context.strokeStyle = "rgba(200, 35, 35, 1.0)";
		// 					this.Canvas.Context.stroke();
		// 				}
		// 			}
		// 		});
		// 	});
		// }

		//? Show a radius around a creature
		// {
		// 	let points = this.FuzzyKnights.Common.World.Map.GetNeighborsBox(x, y, 1);
		// 	points.forEach(n => {
		// 		this.Canvas.Context.fillRect(
		// 			n[0] * this.FuzzyKnights.Common.Game.Settings.View.Tile.Width,
		// 			n[1] * this.FuzzyKnights.Common.Game.Settings.View.Tile.Height,
		// 			this.FuzzyKnights.Common.Game.Settings.View.Tile.Width,
		// 			this.FuzzyKnights.Common.Game.Settings.View.Tile.Height
		// 		);
		// 	});
		// }
		
		//? Outline the borders of tiles
		//* Take this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera as the reference here
		// this.Context.strokeRect(x, y, this.Tile.Width, this.Tile.Height);
	}
}

export default DebugView;