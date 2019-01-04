import { NewUUID } from "./../../utility/Functions.js";

import Canvas from "./Canvas.js";

class Cinematograph {
	constructor(uuid, canvas) {
		this.UUID = uuid || NewUUID();
		this.Canvas = new Canvas(canvas);

		if(!canvas) {
			this.Canvas.Element.id = this.UUID;
			this.Canvas.SetWidth(500).SetHeight(500);
		}
		
		this.Width = this.Canvas.Width;
		this.Height = this.Canvas.Height;
	}

	GetCanvas() {
		return this.Canvas;
	}
	GetHTMLCanvas() {
		return this.Canvas.Element;
	}
	GetCanvasContext() {
		return this.Canvas.Context;
	}

	Render(time) {
		this.Canvas.PreDraw();
	}
}

export default Cinematograph;