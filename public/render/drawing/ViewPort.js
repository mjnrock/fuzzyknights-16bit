class ViewPort {
	constructor(canvas, director) {
		this.Canvas = canvas;
		this.Director = director;
	}

	GetFeed() {
		return this.Director.GetFeed();
	}
}

export default ViewPort;