class AABB {
	/**
	 * This will create a rectangle by creating a point at (x, y) and then expand 4-directionally
	 * to create the bounding region Top Left = (x - rx, y - ry), Bottom Right = (x + rx, y + ry)
	 * 
	 * NOTE: Interpret "radius" from an inscribed-circle perspective, not circumscribed
	 * @param {number} cx | Center Point X
	 * @param {number} cy | Center Point Y
	 * @param {number} rx | The "X Radius"
	 * @param {number} ry | The "Y Radius"
	 */
	constructor(cx, cy, rx, ry = rx) {
		this.Center = {
			X: cx,
			Y: cy
		};
		this.Radius = {
			X: rx,
			Y: ry
		};
	}

	TopLeft() {
		return [
			this.Center.X - this.Radius.X,
			this.Center.Y - this.Radius.Y
		];
	}
	BottomRight() {
		return [
			this.Center.X + this.Radius.X,
			this.Center.Y + this.Radius.Y
		];
	}
	
	GetBoundary(asObj = false) {
		if(asObj) {
			let tl = this.TopLeft(),
				br = this.BottomRight();

			return {
				X0: tl[0],
				Y0: tl[1],
				X1: br[0],
				Y1: br[1]
			};
		}

		return [
			...this.TopLeft(),
			...this.BottomRight()
		];
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
	static CalcBoundingBox(x, y, rx, ry = rx) {
		return {
			X0: x - rx,
			Y0: y - ry,
			X1: x + rx,
			Y1: y + ry
		};
	}
}

export default AABB;