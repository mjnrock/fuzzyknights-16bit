import Canvas from "./Canvas.js";

// It is generally implied that there only will ever be 1 instance of this at a time, treat as such
class ViewPort {
	constructor(fk) {
		this.FuzzyKnights = fk;

		this.Canvas = new Canvas("viewport");
		this.Camera = new this.FuzzyKnights.Render.Drawing.Actor(
			this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
			3
		);
		// this.Camera = new this.FuzzyKnights.Render.Drawing.Camera(
		// 	this.FuzzyKnights.Component.Mutator.Worlds.GetZone(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()),
		// 	2,
		// 	2,
		// 	2			
		// );
		
		// this.HUD = new this.FuzzyKnights.Render.Drawing.HUD(this.FuzzyKnights, this.Canvas);
		
		this.DebugCanvas = new Canvas("debug");
	}

	Render(time) {
		this.Canvas.PreDraw();
		this.Canvas.DrawImage(
			this.Camera.GetFeed().GetHTMLCanvas(),
			~~((window.innerWidth - this.Camera.Canvas.Width) / 2),
			~~((window.innerHeight - this.Camera.Canvas.Height) / 2)
		);
		
		this.DrawDebugWindow();
		
		// if(this.FuzzyKnights.Game.Settings.View.HUD && this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()) {
		// 	this.HUD.Draw(time, this.FuzzyKnights.Render.RenderManager.GetCreatureModels());
		// }
		
		return this.Canvas;
	}

	


	DrawDebugWindow() {
		//DEBUG
		this.DebugCanvas.PreDraw();
		if(this.FuzzyKnights.Game.Settings.View.DebugMode) {
			// ? Highlight the Tile of the Player
			// {
			// 	this.DebugCanvas.Context.fillStyle = "rgba(0, 0, 0, 0.15)";
			// 	this.DebugCanvas.Context.fillRect(
			// 		tx - this.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
			// 		ty - this.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
			// 		this.FuzzyKnights.Game.Settings.View.Tile.Width,
			// 		this.FuzzyKnights.Game.Settings.View.Tile.Height
			// 	);
			// }

			// ? Entity Collision Mask
			// {
			// 	let node = this.FuzzyKnights.World.MapManager.GetActiveMap().GetNode(tx, ty, false)
			// 	node.GetCreatures().forEach(ent => {
			// 		let origin = this.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(ent).Origin;

			// 		this.DebugCanvas.Context.beginPath();
			// 		this.DebugCanvas.Context.arc(
			// 			tx + origin.X,
			// 			ty + origin.Y,
			// 			this.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(ent).Radius,
			// 			0,
			// 			2 * Math.PI
			// 		);
			// 		this.DebugCanvas.Context.lineWidth = 2;
			// 		this.DebugCanvas.Context.strokeStyle = "rgba(200, 35, 35, 1.0)";
			// 		this.DebugCanvas.Context.stroke();
			// 	});
			// }

			//? Show a radius around a creature
			// {
			// 	let points = this.FuzzyKnights.World.Map.GetNeighborsBox(x, y, 1);
			// 	points.forEach(n => {
			// 		this.DebugCanvas.Context.fillRect(
			// 			n[0] * this.FuzzyKnights.Game.Settings.View.Tile.Width,
			// 			n[1] * this.FuzzyKnights.Game.Settings.View.Tile.Height,
			// 			this.FuzzyKnights.Game.Settings.View.Tile.Width,
			// 			this.FuzzyKnights.Game.Settings.View.Tile.Height
			// 		);
			// 	});
			// }
			
			//? Outline the borders of tiles
			//* Take this.Camera as the reference here
			// this.Context.strokeRect(x, y, this.Tile.Width, this.Tile.Height);

			//? Details
			{
				
				this.DebugCanvas.Context.fillStyle = "rgba(0, 0, 0, 0.95)";
				this.DebugCanvas.Context.fillRect(
					0,
					0,
					this.DebugCanvas.Width,
					150
				);
				this.DebugCanvas.Context.fillStyle = "rgba(255, 255, 255, 1.0)";
				this.DebugCanvas.Context.font = "10pt monospace";

				let player = this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
					compWorlds = this.FuzzyKnights.Component.Mutator.Worlds.GetComponent(player),
					compPhysics = this.FuzzyKnights.Component.Mutator.Physics.GetComponent(player),
					zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(player),
					node = zone.Get(compWorlds.Heading.Point.X, compWorlds.Heading.Point.Y),
					terrain = node.Terrain,
					compTerInf = this.FuzzyKnights.Component.Mutator.TerrainInfo.GetComponent(terrain),
					row = (r = 0) => (r + 1) * 16,
					col = (c = 1, fudge = 0) => {
						if(typeof fudge === "string" || fudge instanceof String) {
							fudge = ~~(this.DebugCanvas.Context.measureText(fudge).width / 2);
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
				this.DebugCanvas.Context.fillText(`[ PLAYER ]`, col(1, `[ PLAYER ]`), r1.next().value);
				this.DebugCanvas.Context.fillText(`Acceleration: ${ compPhysics.Kinetics.Kinematics.Acceleration.X }ts, ${ compPhysics.Kinetics.Kinematics.Acceleration.Y }ts, ${ compPhysics.Kinetics.Kinematics.Acceleration.Angle.Theta }rs`, col(1), r1.next().value);
				this.DebugCanvas.Context.fillText(`Velocity: ${ compPhysics.Kinetics.Kinematics.Velocity.X }ts, ${ compPhysics.Kinetics.Kinematics.Velocity.Y }ts, ${ compPhysics.Kinetics.Kinematics.Velocity.Angle.Theta }rs`, col(1), r1.next().value);
				this.DebugCanvas.Context.fillText(`Displacement: ${ compPhysics.Kinetics.Kinematics.Displacement.X }ts, ${ compPhysics.Kinetics.Kinematics.Displacement.Y }ts, ${ compPhysics.Kinetics.Kinematics.Displacement.Angle.Theta }rs`, col(1), r1.next().value);
				this.DebugCanvas.Context.fillText(`Position: ${ compWorlds.Heading.Point.X.toFixed(2) }x, ${ compWorlds.Heading.Point.Y.toFixed(2) }y`, col(1), r1.next().value);
				this.DebugCanvas.Context.fillText(`Facing: ${ compWorlds.Heading.Angle.Theta }°`, col(1), r1.next().value);
				this.DebugCanvas.Context.fillText(
					`Mask: ${
						(compWorlds.Heading.Point.X + (compPhysics.CollisionMask.Origin.X / this.FuzzyKnights.Game.Settings.View.Tile.Target)).toFixed(2)
					}, ${
						(compWorlds.Heading.Point.Y + (compPhysics.CollisionMask.Origin.Y / this.FuzzyKnights.Game.Settings.View.Tile.Target)).toFixed(2)
					}, ${
						compPhysics.CollisionMask.Radius
					}`,
					col(1),
					r1.next().value
				);
				this.DebugCanvas.Context.fillText(`- Type: ${ compPhysics.CollisionMask.constructor.name.replace(/CollisionMask/gi, "") }`, col(1), r1.next().value);
				this.DebugCanvas.Context.fillText(`- XYR: ${ compPhysics.CollisionMask.Origin.X }px, ${ compPhysics.CollisionMask.Origin.Y }px, ${ compPhysics.CollisionMask.Radius }px`, col(1), r1.next().value);
				
				let r2 = rowg();
				this.DebugCanvas.Context.fillText(`[ TERRAIN ]`, col(2, `[ TERRAIN ]`), r2.next().value);
				this.DebugCanvas.Context.fillText(`Tile: ${ ~~compWorlds.Heading.Point.X }, ${ ~~compWorlds.Heading.Point.Y }`, col(2), r2.next().value);
				this.DebugCanvas.Context.fillText(`Type: ${ this.FuzzyKnights.Component.Enum.TerrainType.Lookup(compTerInf.TerrainType) }`, col(2), r2.next().value);
				this.DebugCanvas.Context.fillText(`- Meta: ${ compTerInf.Meta }`, col(2), r2.next().value);
				this.DebugCanvas.Context.fillText(`Nav: ${ this.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability).toFixed(2) }`, col(2), r2.next().value);
				this.DebugCanvas.Context.fillText(`- Type: ${ this.FuzzyKnights.Component.Enum.NavigabilityType.Lookup(compTerInf.Navigability) }`, col(2), r2.next().value);
				
				let r3 = rowg();
				this.DebugCanvas.Context.fillText(`[ GAME ]`, col(3, `[ GAME ]`), r3.next().value);
				this.DebugCanvas.Context.fillText(`ViewPort: ${ this.DebugCanvas.Width }px, ${ this.DebugCanvas.Height }px`, col(3), r3.next().value);
				this.DebugCanvas.Context.fillText(`Camera: ${ this.Camera.Canvas.Width }px, ${ this.Camera.Canvas.Height }px | ${ this.FuzzyKnights.Render.RenderManager.ViewPort.Camera.IsTracking ? "FOLLOW" : "STATIONARY" }`, col(3), r3.next().value);
				this.DebugCanvas.Context.fillText(`- Detail: ${ this.Camera.X.toFixed(2) }x, ${ this.Camera.Y.toFixed(2) }y, r=[${ this.Camera.Radius.Width },${ this.Camera.Radius.Height }]`, col(3), r3.next().value);

				this.DebugCanvas.Context.fillText(`Ticks: ${ this.FuzzyKnights.Game.GameManager.GameLoop.Ticks }`, col(3), r3.next().value);
				this.DebugCanvas.Context.fillText(`- FPS: ${ this.FuzzyKnights.Game.GameManager.GameLoop.TicksPerSecond.toFixed(1) }`, col(3), r3.next().value);
				this.DebugCanvas.Context.fillText(`Renders: ${ this.FuzzyKnights.Game.GameManager.GameLoop.Renders }`, col(3), r3.next().value);
				this.DebugCanvas.Context.fillText(`- FPS: ${ (1000 / this.FuzzyKnights.Game.GameManager.GameLoop.LastRenderTime).toFixed(1) }`, col(3), r3.next().value);
				this.DebugCanvas.Context.fillText(`- AFPS: ${ (this.FuzzyKnights.Game.GameManager.GameLoop.Renders / (this.FuzzyKnights.Game.GameManager.GameLoop.RenderTime / 1000)).toFixed(1) }`, col(3), r3.next().value);
			}
		}
	}
}

export default ViewPort;