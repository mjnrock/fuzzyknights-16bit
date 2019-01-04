import { NewUUID } from "./../../utility/Functions.js";
import Grid from "./../../utility/Grid.js";

class Canvas {
	/**
	 * 
	 * @param {string|HTMLElement} htmlElement | Pass either the #id of element or the element itself
	 */
	static TILE(which = null) {
		const tile = {
			W: 128,		// Width
			H: 128,		// Height
			S: 1.0		// Scale
		};

		if(which === null) {
			return tile;
		} else if(which === 0) {
			return tile.W;
		} else if(which === 1) {
			return tile.H;
		} else if(which === 2) {
			return tile.S;
		}

		return tile;
	}

	constructor(canvas) {
		if(canvas) {
			if(typeof canvas === "string" || canvas instanceof String) {
				this.Element = document.getElementById(canvas);
			} else {
				this.Element = canvas;
			}
		} else {
			this.Element = document.createElement("canvas");
			this.Element.id = NewUUID();
		}

		this.Height = this.Element.height;
		this.Width = this.Element.width;
		this.Context = this.Element.getContext("2d");

		this.Grid = new Grid(Math.floor(this.Width / Canvas.FuzzyKnights.Game.Settings.View.Tile.Width), Math.floor(this.Height / Canvas.FuzzyKnights.Game.Settings.View.Tile.Height));

		this.ReScale();
	}

	SetWidth(value) {
		this.Element.width = value;
		this.Width = value;

		return this;
	}
	SetHeight(value) {
		this.Element.height = value;
		this.Height = value;

		return this;
	}

	PreDraw() {
		this.Context.clearRect(0, 0, this.Width, this.Height);
	}

	/**
	 * 
	 * @param {number} scale ?1.0 | Change this.Scale to @scale
	 * @param {bool} byFactor ?false | If true, multiply this.Scale by @scale
	 */
	ReScale(scale = 1.0, byFactor = false) {
		if(byFactor) {
			this.Scale *= scale;
			this.Context.scale(this.Scale, this.Scale);
		} else {
			this.Scale = scale;
			this.Context.scale(this.Scale, this.Scale);
		}

		return this;
	}

	/**
	 * 
	 * @param {Image} image 
	 * @param {number} u | Image X (start)
	 * @param {number} v | Image Y (start)
	 * @param {number} uw | Image Clipping Width
	 * @param {number} vh | Image Clipping Height
	 * @param {number} x | Canvas X
	 * @param {number} y | Canvas Y
	 * @param {number} w | Render Width
	 * @param {number} h | Render Height
	 */
	DrawImage(image, u, v, uw, vh, x, y, w, h) {
		this.Context.drawImage(image, u, v, uw, vh, x, y, w, h);

		return this;
	}

	DrawTile(image, x, y, sx = 0, sy = 0) {
		let tx = x * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width;
		let ty = y * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height;
		
		this.DrawImage(
			image,
			sx * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
			sy * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height,
			Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
			Canvas.FuzzyKnights.Game.Settings.View.Tile.Height,
			tx - Canvas.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
			ty - Canvas.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
			Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
			Canvas.FuzzyKnights.Game.Settings.View.Tile.Height
		);
		
		//DEBUG
		if(Canvas.FuzzyKnights.Game.Settings.View.DebugMode) {
			//? Highlight the Tile of the Player
			{
				this.Context.fillStyle = "rgba(0, 0, 0, 0.15)";
				this.Context.fillRect(
					tx - Canvas.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
					ty - Canvas.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
					Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
					Canvas.FuzzyKnights.Game.Settings.View.Tile.Height
				);
			}

			//? Entity Collision Mask
			{
				let node = Canvas.FuzzyKnights.World.MapManager.GetActiveMap().GetNode(tx, ty, false)
				node.GetCreatures().forEach(ent => {
					let origin = Canvas.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(ent).Origin;

					this.Context.beginPath();
					this.Context.arc(
						tx + origin.X,
						ty + origin.Y,
						Canvas.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(ent).Radius,
						0,
						2 * Math.PI
					);
					this.Context.lineWidth = 2;
					this.Context.strokeStyle = "rgba(200, 35, 35, 1.0)";
					this.Context.stroke();
				});
			}

			//? Show a radius around a creature
			{
				let points = Canvas.FuzzyKnights.World.Map.GetNeighborsBox(x, y, 1);
				points.forEach(n => {
					this.Context.fillRect(
						n[0] * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
						n[1] * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height,
						Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
						Canvas.FuzzyKnights.Game.Settings.View.Tile.Height
					);
				});
			}

			//? Details
			{
				this.Context.fillStyle = "rgba(0, 0, 0, 0.25)";
				this.Context.fillRect(
					0,
					0,
					this.Width,
					140
				);
				this.Context.fillStyle = "rgba(255, 255, 255, 1.0)";
				this.Context.font = "14px monospace";

				let player = Canvas.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
					compMaps = Canvas.FuzzyKnights.Component.Mutator.Maps.GetComponent(player),
					compRigBod = Canvas.FuzzyKnights.Component.Mutator.RigidBody.GetComponent(player),
					map = Canvas.FuzzyKnights.Component.Mutator.Maps.GetMap(player),
					node = map.GetNode(compMaps.ActiveMap.Heading.Position.X, compMaps.ActiveMap.Heading.Position.Y),
					terrain = node.GetTerrain()[0],
					compTerInf = Canvas.FuzzyKnights.Component.Mutator.TerrainInfo.GetComponent(terrain),
					row = (r = 0) => (r + 1) * 16,
					col = (c = 1, fudge = 0) => (c - 1) * 250 + 10 + fudge,
					rowg = function*(r = 0) {
						while(true) {
							r++;
							yield r * 16;
						}
					};
				
				let r1 = rowg();
				this.Context.fillText(`[ PLAYER ]`, col(1), r1.next().value);
				this.Context.fillText(`Velocity: ${ compMaps.Velocity.Vector.X }ts, ${ compMaps.Velocity.Vector.Y }ts, ${ compMaps.Velocity.Rotation.Yaw }rs`, col(1), r1.next().value);
				this.Context.fillText(
					`Speed: ${
						(compMaps.Velocity.Vector.X * Canvas.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability)).toFixed(2)
					}ts, ${
						(compMaps.Velocity.Vector.Y * Canvas.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability)).toFixed(2)
					}ts`,
					col(1),
					r1.next().value
				);
				this.Context.fillText(`Position: ${ compMaps.ActiveMap.Heading.Position.X.toFixed(2) }x, ${ compMaps.ActiveMap.Heading.Position.Y.toFixed(2) }y`, col(1), r1.next().value);
				this.Context.fillText(`Facing: ${ compMaps.ActiveMap.Heading.Rotation.Yaw }°`, col(1), r1.next().value);
				this.Context.fillText(
					`Mask: ${
						(compMaps.ActiveMap.Heading.Position.X + (compRigBod.CollisionMask.Origin.X / Canvas.FuzzyKnights.Game.Settings.View.Tile.Target)).toFixed(2)
					}, ${
						(compMaps.ActiveMap.Heading.Position.Y + (compRigBod.CollisionMask.Origin.Y / Canvas.FuzzyKnights.Game.Settings.View.Tile.Target)).toFixed(2)
					}, ${
						compRigBod.CollisionMask.Radius
					}`,
					col(1),
					r1.next().value
				);
				this.Context.fillText(`- Type: ${ compRigBod.CollisionMask.constructor.name.replace(/CollisionMask/gi, "") }`, col(1), r1.next().value);
				this.Context.fillText(`- XYR: ${ compRigBod.CollisionMask.Origin.X }px, ${ compRigBod.CollisionMask.Origin.Y }px, ${ compRigBod.CollisionMask.Radius }px`, col(1), r1.next().value);
				
				let r2 = rowg();
				this.Context.fillText(`[ TERRAIN ]`, col(2), r2.next().value);
				this.Context.fillText(`Tile: ${ ~~compMaps.ActiveMap.Heading.Position.X }, ${ ~~compMaps.ActiveMap.Heading.Position.Y }`, col(2), r2.next().value);
				this.Context.fillText(`Type: ${ Canvas.FuzzyKnights.Component.Enum.TerrainType.Lookup(compTerInf.TerrainType) }`, col(2), r2.next().value);
				this.Context.fillText(`- Meta: ${ compTerInf.Meta }`, col(2), r2.next().value);
				this.Context.fillText(`Nav: ${ Canvas.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(compTerInf.Navigability).toFixed(2) }`, col(2), r2.next().value);
				this.Context.fillText(`- Type: ${ Canvas.FuzzyKnights.Component.Enum.NavigabilityType.Lookup(compTerInf.Navigability) }`, col(2), r2.next().value);
				
				let r3 = rowg();
				this.Context.fillText(`[ GAME ]`, col(3), r3.next().value);
				this.Context.fillText(`Ticks: ${ Canvas.FuzzyKnights.Game.GameManager.GameLoop.Ticks }`, col(3), r3.next().value);
				this.Context.fillText(`- FPS: ${ Canvas.FuzzyKnights.Game.GameManager.GameLoop.TicksPerSecond.toFixed(1) }`, col(3), r3.next().value);
				this.Context.fillText(`Renders: ${ Canvas.FuzzyKnights.Game.GameManager.GameLoop.Renders }`, col(3), r3.next().value);
				this.Context.fillText(`- FPS: ${ (1000 / Canvas.FuzzyKnights.Game.GameManager.GameLoop.LastRenderTime).toFixed(1) }`, col(3), r3.next().value);
				this.Context.fillText(`- AFPS: ${ (Canvas.FuzzyKnights.Game.GameManager.GameLoop.Renders / (Canvas.FuzzyKnights.Game.GameManager.GameLoop.RenderTime / 1000)).toFixed(1) }`, col(3), r3.next().value);
			}
		}

		return this;
	}
	DrawColoredTile(image, x, y, color = null, sx = 0, sy = 0) {
		x = x * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width;
		y = y * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height;
		
		this.DrawImage(image, sx * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, sy * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height, x, y, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height);
		if(color !== null && color !== void 0) {
			this.ColorizeTile(x, y, color);
		}

		//DEBUG
		if(Canvas.FuzzyKnights.Game.Settings.View.DebugMode) {
			this.Context.strokeRect(x, y, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height);
		}

		return this;
	}

	/**
	 * 
	 * @param {Image} image 
	 * @param {number} tx | Tile X
	 * @param {number} ty | Tile Y
	 * @param {number} sx ?0 | (Tile) Sprite X
	 * @param {number} sy ?0 | (Tile) Sprite Y
	 */
	DrawFitToTile(image, tx, ty, sx = 0, sy = 0) {
		let x = tx * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
			y = ty * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height;
		
		this.DrawImage(image, sx * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, sy * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height, x, y, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height);

		return this;
	}

	DrawColorizedFitToTile(image, tx, ty, color, sx = 0, sy = 0) {		
		let x = tx * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
			y = ty * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height;

		this.DrawFitToTile(image, tx, ty, sx = 0, sy = 0);
		this.ColorizeTile(x, y, color);

		return this;
	}

	ColorizeTile(x, y, color = "rgb(54, 132, 54)") {
		this.Context.globalCompositeOperation = "color";
		this.Context.fillStyle = color;
		this.Context.fillRect(x, y, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height);
		this.Context.globalCompositeOperation = "source-over";
	}
	
	static GetPixel(image, x, y, retAsObj = false) {
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);

		if(retAsObj) {
			let data = ctx.getImageData(x, y, 1, 1).data;

			return {
				R255: data[0],
				G255: data[1],
				B255: data[2],
				A255: data[3],
				A1: data[3] / 255
			}
		}

		return ctx.getImageData(x, y, 1, 1).data;
	}

	static RGBToHex(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	static HexToRGB(hex) {
		let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		
		return result ? {
			R: parseInt(result[1], 16),
			G: parseInt(result[2], 16),
			B: parseInt(result[3], 16),
			A: 1.0,
			RGB: `rgb(${ parseInt(result[1], 16) }, ${ parseInt(result[2], 16) }, ${ parseInt(result[3], 16) })`,
			RGBA: `rgba(${ parseInt(result[1], 16) }, ${ parseInt(result[2], 16) }, ${ parseInt(result[3], 16) }, 1.0)`
		} : null;
	}
}

export default Canvas;