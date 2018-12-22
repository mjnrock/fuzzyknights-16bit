import { Grid } from "./Grid.js";

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

	constructor(htmlElement) {
		if(typeof htmlElement === "string" || htmlElement instanceof String) {
			this.Element = document.getElementById(htmlElement);
		} else {
			this.Element = htmlElement;
		}
		this.Height = this.Element.height;
		this.Width = this.Element.width;
		this.Context = this.Element.getContext("2d");

		this.Grid = new Grid(Math.floor(this.Width / Canvas.TILE(0)), Math.floor(this.Height / Canvas.TILE(1)));

		this.ReScale();
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

	/**
	 * 
	 * @param {Image} image 
	 * @param {number} tx | Tile X
	 * @param {number} ty | Tile Y
	 * @param {number} sx ?0 | (Tile) Sprite X
	 * @param {number} sy ?0 | (Tile) Sprite Y
	 */
	DrawFitToTile(image, tx, ty, sx = 0, sy = 0) {
		let x = tx * Canvas.TILE(0),
			y = ty * Canvas.TILE(1);

		
		this.DrawImage(image, sx * Canvas.TILE(0), sy * Canvas.TILE(1), Canvas.TILE(0), Canvas.TILE(1), x, y, Canvas.TILE(0), Canvas.TILE(1));

		return this;
	}

	DrawColorizedFitToTile(image, tx, ty, color, sx = 0, sy = 0) {		
		let x = tx * Canvas.TILE(0),
			y = ty * Canvas.TILE(1);

		this.DrawFitToTile(image, tx, ty, sx = 0, sy = 0);
		this.ColorizeTile(x, y, color);

		return this;
	}

	ColorizeTile(x, y, color = "rgb(54, 132, 54)") {
		this.Context.globalCompositeOperation = "color";
		this.Context.fillStyle = color;
		this.Context.fillRect(x, y, Canvas.TILE(0), Canvas.TILE(1));
		this.Context.globalCompositeOperation = "source-over";
    }
}

export default Canvas;