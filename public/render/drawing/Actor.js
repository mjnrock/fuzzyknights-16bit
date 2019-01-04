import Camera from "./Camera.js";
import Cinematograph from "./Cinematograph.js";

class Actor extends Camera {
	constructor(entity, tiles, ar = 1) {
		super(
			Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetMap(entity),
			3,
			3,
			tiles,
			ar
		);
		
		this.Entity = entity;
		this.IsTracking = true;

		// this.Canvas.SetDimensions(width, height);
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
		let pos = Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetPosition(this.Entity);

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