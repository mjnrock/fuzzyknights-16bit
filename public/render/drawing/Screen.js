import Cinematograph from "./Cinematograph.js";

class Screen extends Cinematograph {
	constructor(id, cameras = []) {
		super(id);

		this.Cameras = cameras;
		this.FeedCamera = null;
	}

	LiveCamera(index = 0) {
		this.FeedCamera = this.Cameras[index];

		return this;
	}
	GetFeed() {
		return this.FeedCamera;
	}

	GetCameras() {
		return this.Cameras;
	}
	GetCamera(index = 0) {
		return this.Cameras[index];
	}
	SetCamera(camera, index = 0) {
		this.Cameras[index] = camera;

		return this;
	}

	AddCamera(camera) {
		this.Cameras.push(camera);

		return this;
	}
	RemoveCamera(index) {
		delete this.Cameras[index];

		return this;
	}
}

export default Screen;