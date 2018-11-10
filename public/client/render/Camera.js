class Camera {
	constructor(canvas, resolution) {
		this.Width = canvas.width = window.innerWidth;
		this.Height = canvas.height = window.innerHeight;
		this.Resolution = resolution;
		this.ColumnWidth = this.Width / this.Resolution;	//? For interlacing
		this.FocalLength = this.Height / this.Width;

		this.Position = {
			X: 0,
			Y: 0,
			Z: 0
		};
	}
}

export default Camera;