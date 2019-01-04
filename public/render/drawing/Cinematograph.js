import { NewUUID } from "./../../utility/Functions.js";

import Canvas from "./Canvas.js";

class Cinematograph {
	constructor(uuid) {
		this.UUID = uuid || NewUUID();
		this.Canvas = new Canvas();

		this.Canvas.SetWidth(500).SetHeight(500);
		this.Width = this.Canvas.Width;
		this.Height = this.Canvas.Height;
	}
}

export default Cinematograph;