import Bitwise from "../../utility/Bitwise.js";
import EnumPlayerKeyState from "../../enum/bitwise/PlayerKeyState.js";

class MouseListener {
	constructor(fk) {
		this.FuzzyKnights = fk;

		document.getElementById("entity").addEventListener("mousemove", this.OnMouseMove.bind(this), false);
		document.getElementById("entity").addEventListener("mousedown", this.OnMouseDown.bind(this), false);
		document.getElementById("entity").addEventListener("mouseup", this.OnMouseUp.bind(this), false);
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