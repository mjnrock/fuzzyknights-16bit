class MouseListener {
	constructor(fk) {
		this.FuzzyKnights = fk;

		document.getElementById("entity").addEventListener("mousemove", this.OnMouseMove.bind(this), false);
		document.getElementById("entity").addEventListener("mousedown", this.OnMouseDown.bind(this), false);
		document.getElementById("entity").addEventListener("mouseup", this.OnMouseUp.bind(this), false);
		
		document.getElementById("entity").addEventListener("contextmenu", e => e.preventDefault());
		document.getElementById("terrain").addEventListener("contextmenu", e => e.preventDefault());
	}

	OnMouseMove(e) {
		(new this.FuzzyKnights.Message.InputMouseMessage(e)).Send();
	}
	OnMouseDown(e) {
		(new this.FuzzyKnights.Message.InputMouseMessage(e)).Send();
	}
	OnMouseUp(e) {
		(new this.FuzzyKnights.Message.InputMouseMessage(e)).Send();
	}
}

export { MouseListener };