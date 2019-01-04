import Cinematograph from "./Cinematograph.js";

class Director extends Cinematograph {
	constructor(screen) {
		super();

		this.Screen = screen;
	}

	GetFeed() {
		return this.Screen.GetFeed();
	}

	Render(time) {
		super.Render(time);

		if(this.Screen) {
			this.Screen.Render(time);
			this.Canvas.DrawImage(this.Screen.GetHTMLCanvas(), 0, 0);
		}

		return this;
	}
}

export default Director;