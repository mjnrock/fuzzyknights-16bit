import Position from "./Position.js";

class CollisionMask {
	constructor(x, y) {
		this.Origin = new Position(x, y);
	}
}

export default CollisionMask;