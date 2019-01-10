import { NewUUID } from "./../../utility/Functions.js";

class Canvas {
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
	SetDimensions(width, height) {
		this.SetWidth(width).SetHeight(height);

		return this;
	}

	GetHTMLCanvas() {
		return this.Element;
	}
	GetCanvasContext() {
		return this.Context;
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
		if(arguments.length === 3) {
			this.Context.drawImage(image, ~~u, ~~v);

			return this;
		} else if(arguments.length === 5) {
			this.Context.drawImage(image, ~~u, ~~v, ~~uw, ~~vh);

			return this;
		}

		this.Context.drawImage(image, ~~u, ~~v, ~~uw, ~~vh, ~~x, ~~y, ~~w, ~~h);

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
			// tx - Canvas.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
			// ty - Canvas.FuzzyKnights.Game.Settings.View.Tile.Target / 2,
			tx,
			ty,
			Canvas.FuzzyKnights.Game.Settings.View.Tile.Width,
			Canvas.FuzzyKnights.Game.Settings.View.Tile.Height
		);

		return this;
	}
	DrawColoredTile(image, x, y, color = null, sx = 0, sy = 0) {
		x = x * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width;
		y = y * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height;
		
		this.DrawImage(image, sx * Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, sy * Canvas.FuzzyKnights.Game.Settings.View.Tile.Height, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height, x, y, Canvas.FuzzyKnights.Game.Settings.View.Tile.Width, Canvas.FuzzyKnights.Game.Settings.View.Tile.Height);
		if(color !== null && color !== void 0) {
			this.ColorizeTile(x, y, color);
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