import Director from "./Director.js";
import Canvas from "./Canvas.js";

class ViewPort {
	constructor(canvas) {
		this.Canvas = new Canvas(canvas);
		this.Director = new Director();
	}

	Render(time) {
		this.Canvas.PreDraw();

		this.Director.Render(time);
		this.Canvas.DrawImage(this.Director.GetHTMLCanvas(), 0, 0);
	}
}

export default ViewPort;