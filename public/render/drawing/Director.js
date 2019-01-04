import Cinematograph from "./Cinematograph.js";

class Director extends Cinematograph {
	constructor(id, screen) {
		super(id);

		this.Screen = screen;
	}

	GetFeed() {
		return this.Screen.GetFeed();
	}
}

export default Director;