class MouseListener {
	constructor(fk) {
		this.FuzzyKnights = fk;

		document.addEventListener("mousemove", this.OnMouseMove.bind(this), false);
		document.addEventListener("mousedown", this.OnMouseDown.bind(this), false);
		document.addEventListener("mouseup", this.OnMouseUp.bind(this), false);
		
		document.addEventListener("contextmenu", e => e.preventDefault());
		document.addEventListener("contextmenu", e => e.preventDefault());

		// window.addEventListener("mousemove", this.OnMouseMove.bind(this), false);
		// window.addEventListener("mousedown", this.OnMouseDown.bind(this), false);
		// window.addEventListener("mouseup", this.OnMouseUp.bind(this), false);
		
		// window.addEventListener("contextmenu", e => e.preventDefault());
		// window.addEventListener("contextmenu", e => e.preventDefault());
	}

	OnMouseMove(e) {
		(new this.FuzzyKnights.Common.Message.InputMouseMessage(e)).Send();
	}
	OnMouseDown(e) {
		(new this.FuzzyKnights.Common.Message.InputMouseMessage(e)).Send();
	}
	OnMouseUp(e) {
		(new this.FuzzyKnights.Common.Message.InputMouseMessage(e)).Send();
	}
}

export { MouseListener };