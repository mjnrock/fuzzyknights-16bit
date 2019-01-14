import Point from "./Point.js";

class CollisionMask {
	constructor(x, y) {
		this.Origin = new Point(x, y);
	}

	GetValues() {
		return [
			this.Origin.Get()
		];
	}

	CheckCollision() {
		//TODO Polygon test
	}
}

export default CollisionMask;