import Director from "./Director.js";
import Canvas from "./Canvas.js";

class ViewPort {
	constructor(terrainCanvas, entityCanvas) {
		this.Terrain = terrainCanvas || new Canvas();
		this.Entity = entityCanvas || new Canvas();
		this.Director = new Director();
	}

	Render(time) {
		//TODO
	}
}

export default ViewPort;