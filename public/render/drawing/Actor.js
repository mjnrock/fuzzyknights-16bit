import Camera from "./Camera.js";
import Cinematograph from "./Cinematograph.js";

class Actor extends Camera {
	constructor(entity, tiles) {
		super(
			Cinematograph.FuzzyKnights.Component.Mutator.Worlds.GetZone(entity),
			3,
			3,
			tiles
		);
		
		this.Entity = entity;
		this.IsTracking = true;
	}

	Track() {
		this.IsTracking = true;

		return this;
	}
	UnTrack() {
		this.IsTracking = false;

		return this;
	}

	UpdatePosition() {
		let pos = Cinematograph.FuzzyKnights.Component.Mutator.Worlds.GetPoint(this.Entity);

		this.X = pos.X;
		this.Y = pos.Y;

		return this;
	}

	GetFeed() {
		if(this.IsTracking) {
			this.UpdatePosition();
		}
		
		return super.GetFeed();
	}
}

export default Actor;