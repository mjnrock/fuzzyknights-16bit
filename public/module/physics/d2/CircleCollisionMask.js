import CollisionMask from "./CollisionMask.js";

class CircleCollisionMask extends CollisionMask {
	constructor(x, y, r) {
		super(x, y);

		this.Radius = r;
	}

	GetValues() {
		return [
			...super.GetValues(),
			this.Radius
		];
	}

	//# CheckCircleCollision(CircleCollisionMask)
	//# CheckCircleCollision(x, y, r)
	CheckCircleCollision(x, y, r) {
		if(x instanceof CircleCollisionMask) {
			let cEe = x;
			return this.CheckIntersection(...this.GetValues(), ...cEe.GetValues());
		}

		return this.CheckIntersection(...this.GetValues(), x, y, r);
	}

	CheckIntersection(x0, y0, r0, x1, y1, r1) {
		return Math.hypot(x0 - x1, y0 - y1) <= r0 + r1;
	}
}

export default CircleCollisionMask;