import CollisionMask from "./CollisionMask.js";
import Position from "./Position.js";

class RectangleCollisionMask extends CollisionMask {
	constructor(x, y, rx, ry) {
		super(x, y);

		this.TopLeft = new Position(x - rx, y - ry);
		this.BottomRight = new Position(x + rx, y + ry);
	}
}

export default RectangleCollisionMask;