import Cinematograph from "./Cinematograph.js";
import Camera from "./Camera.js";

class Screen extends Cinematograph {
	constructor(cameras = []) {
		super();
		
		this.Cameras = cameras;
		this.FeedCamera = null;
	}

	LiveCamera(index = 0) {
		this.FeedCamera = this.Cameras[index];

		return this;
	}
	GetFeed() {
		return this.FeedCamera.GetHTMLCanvas();
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

	// TODO Get Player
	NewPlayerCamera() {
		let camera = (new Camera()).TrackPlayer();

		this.AddCamera(camera);
		this.LiveCamera(this.Cameras.length - 1);

		return this;
	}
	NewCamera(entity, x, y) {
		this.Cameras.push(new Camera(entity, x, y));

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

	Render(time) {
		super.Render(time);
		
		this.FeedCamera.Render(time);
		this.Canvas.DrawImage(this.FeedCamera.GetHTMLCanvas(), 0, 0);

		return this;
	}
}

export default Screen;