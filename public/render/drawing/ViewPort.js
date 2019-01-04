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
		
		// this.HUD = new this.FuzzyKnights.Render.Drawing.HUD(this.FuzzyKnights, this.Canvas);

	}

	Render(time) {
		this.Canvas.PreDraw();
		this.Canvas.DrawImage(this.Camera.GetFeed().GetHTMLCanvas(), 0, 0);
		
		this.DrawDebugWindow();
		
		// if(this.FuzzyKnights.Game.Settings.View.HUD && this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()) {
		// 	this.HUD.Draw(time, this.FuzzyKnights.Render.RenderManager.GetCreatureModels());
		// }
		
		return this.Canvas;
	}

	DrawDebugWindow() {
		//DEBUG
		if(this.FuzzyKnights.Game.Settings.View.DebugMode) {
			let tx = this.Camera.X * this.FuzzyKnights.Game.Settings.View.Tile.Width;
			let ty = this.Camera.Y * this.FuzzyKnights.Game.Settings.View.Tile.Height;

			// ? Highlight the Tile of the Player
			// {
			// 	this.Canvas.Context.fillStyle = "rgba(0, 0, 0, 0.15)";
			// 	this.Canvas.Context.fillRect(
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

			// 		this.Canvas.Context.beginPath();
			// 		this.Canvas.Context.arc(
			// 			tx + origin.X,
			// 			ty + origin.Y,
			// 			this.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(ent).Radius,
			// 			0,
			// 			2 * Math.PI
			// 		);
			// 		this.Canvas.Context.lineWidth = 2;
			// 		this.Canvas.Context.strokeStyle = "rgba(200, 35, 35, 1.0)";
			// 		this.Canvas.Context.stroke();
			// 	});
			// }

			//? Show a radius around a creature
			// {
			// 	let points = this.FuzzyKnights.World.Map.GetNeighborsBox(x, y, 1);
			// 	points.forEach(n => {
			// 		this.Canvas.Context.fillRect(
			// 			n[0] * this.FuzzyKnights.Game.Settings.View.Tile.Width,
			// 			n[1] * this.FuzzyKnights.Game.Settings.View.Tile.Height,
			// 			this.FuzzyKnights.Game.Settings.View.Tile.Width,
			// 			this.FuzzyKnights.Game.Settings.View.Tile.Height
			// 		);
			// 	});
			// }

			//? Details
			{
				this.Canvas.Context.fillStyle = "rgba(0, 0, 0, 0.25)";
				this.Canvas.Context.fillRect(
					0,
					0,
					this.Width,
					140
				);
				this.Canvas.Context.fillStyle = "rgba(255, 255, 255, 1.0)";
				this.Canvas.Context.font = "14px monospace";

				let player = this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
					compMaps = this.FuzzyKnights.Component.Mutator.Maps.GetComponent(player),
					compRigBod = this.FuzzyKnights.Component.Mutator.RigidBody.GetComponent(player),
					map = this.FuzzyKnights.Component.Mutator.Maps.GetMap(player),
					node = map.GetNode(compMaps.ActiveMap.Heading.Position.X, compMaps.ActiveMap.Heading.Position.Y),
					[ terrain ] = node.GetTerrain(),
					compTerInf = this.FuzzyKnights.Component.Mutator.TerrainInfo.GetComponent(terrain),
					row = (r = 0) => (r + 1) * 16,
					col = (c = 1, fudge = 0) => (c - 1) * 250 + 10 + fudge,
					rowg = function*(r = 0) {
						while(true) {
							r++;
							yield r * 16;
						}
					};
				
				let r1 = rowg();
				this.Canvas.Context.fillText(`[ PLAYER ]`, col(1), r1.next().value);
				this.Canvas.Context.fillText(`Velocity: ${ compMaps.Velocity.Vector.X }ts, ${ compMaps.Velocity.Vector.Y }ts, ${ compMaps.Velocity.Rotation.Yaw }rs`, col(1), r1.next().value);
				this.Canvas.Context.fillText(
					`Speed: ${
						(compMaps.Velocity.Vector.X * this.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability)).toFixed(2)
					}ts, ${
						(compMaps.Velocity.Vector.Y * this.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability)).toFixed(2)
					}ts`,
					col(1),
					r1.next().value
				);
				this.Canvas.Context.fillText(`Position: ${ compMaps.ActiveMap.Heading.Position.X.toFixed(2) }x, ${ compMaps.ActiveMap.Heading.Position.Y.toFixed(2) }y`, col(1), r1.next().value);
				this.Canvas.Context.fillText(`Facing: ${ compMaps.ActiveMap.Heading.Rotation.Yaw }°`, col(1), r1.next().value);
				this.Canvas.Context.fillText(
					`Mask: ${
						(compMaps.ActiveMap.Heading.Position.X + (compRigBod.CollisionMask.Origin.X / this.FuzzyKnights.Game.Settings.View.Tile.Target)).toFixed(2)
					}, ${
						(compMaps.ActiveMap.Heading.Position.Y + (compRigBod.CollisionMask.Origin.Y / this.FuzzyKnights.Game.Settings.View.Tile.Target)).toFixed(2)
					}, ${
						compRigBod.CollisionMask.Radius
					}`,
					col(1),
					r1.next().value
				);
				this.Canvas.Context.fillText(`- Type: ${ compRigBod.CollisionMask.constructor.name.replace(/CollisionMask/gi, "") }`, col(1), r1.next().value);
				this.Canvas.Context.fillText(`- XYR: ${ compRigBod.CollisionMask.Origin.X }px, ${ compRigBod.CollisionMask.Origin.Y }px, ${ compRigBod.CollisionMask.Radius }px`, col(1), r1.next().value);
				
				let r2 = rowg();
				this.Canvas.Context.fillText(`[ TERRAIN ]`, col(2), r2.next().value);
				this.Canvas.Context.fillText(`Tile: ${ ~~compMaps.ActiveMap.Heading.Position.X }, ${ ~~compMaps.ActiveMap.Heading.Position.Y }`, col(2), r2.next().value);
				this.Canvas.Context.fillText(`Type: ${ this.FuzzyKnights.Component.Enum.TerrainType.Lookup(compTerInf.TerrainType) }`, col(2), r2.next().value);
				this.Canvas.Context.fillText(`- Meta: ${ compTerInf.Meta }`, col(2), r2.next().value);
				this.Canvas.Context.fillText(`Nav: ${ this.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability).toFixed(2) }`, col(2), r2.next().value);
				this.Canvas.Context.fillText(`- Type: ${ this.FuzzyKnights.Component.Enum.NavigabilityType.Lookup(compTerInf.Navigability) }`, col(2), r2.next().value);
				
				let r3 = rowg();
				this.Canvas.Context.fillText(`[ GAME ]`, col(3), r3.next().value);
				this.Canvas.Context.fillText(`Ticks: ${ this.FuzzyKnights.Game.GameManager.GameLoop.Ticks }`, col(3), r3.next().value);
				this.Canvas.Context.fillText(`- FPS: ${ this.FuzzyKnights.Game.GameManager.GameLoop.TicksPerSecond.toFixed(1) }`, col(3), r3.next().value);
				this.Canvas.Context.fillText(`Renders: ${ this.FuzzyKnights.Game.GameManager.GameLoop.Renders }`, col(3), r3.next().value);
				this.Canvas.Context.fillText(`- FPS: ${ (1000 / this.FuzzyKnights.Game.GameManager.GameLoop.LastRenderTime).toFixed(1) }`, col(3), r3.next().value);
				this.Canvas.Context.fillText(`- AFPS: ${ (this.FuzzyKnights.Game.GameManager.GameLoop.Renders / (this.FuzzyKnights.Game.GameManager.GameLoop.RenderTime / 1000)).toFixed(1) }`, col(3), r3.next().value);
			}
		}
	}
}

export default ViewPort;