import Bitwise from "./../../common/utility/Bitwise.js";
import EnumPlayerKeyState from "./../enum/PlayerKeyState.js";

class KeyHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;

		this.KeyBindings = {	// By this setup, these should map 1-to-1 with PlayerKeyStates
			LEFT: [37, 65],
			RIGHT: [39, 68],
			UP: [38, 87],
			DOWN: [40, 83]
		};
		this.PreviousPlayerKeyState = null;
		this.PlayerKeyState = EnumPlayerKeyState.IDLE;

		window.addEventListener("keyup", this.OnKeyUp.bind(this), false);
		window.addEventListener("keydown", this.OnKeyDown.bind(this), false);
	}

	OnKeyUp(e) {
		if(e.keyCode !== 116 && e.keyCode !== 16) {		//! [F5] & [Shift]
			e.preventDefault();
		}

		this.FlagController(e.keyCode, false);
		// (new this.FuzzyKnights.Common.Message.InputKeyboardMessage(e)).Send();
		if(this.PreviousPlayerKeyState !== this.PlayerKeyState) {
			(new this.FuzzyKnights.Common.Message.InputPlayerKeyStateMessage(this.PlayerKeyState)).Send();
		}
	}

	//*	e.repeat === true allows detection of a continuous press
	OnKeyDown(e) {
		if(e.keyCode !== 116 && e.keyCode !== 16) {		//! [F5] & [Shift]
			e.preventDefault();
		}

		this.PreviousPlayerKeyState = this.PlayerKeyState;
		this.FlagController(e.keyCode, true);
		
		// (new this.FuzzyKnights.Common.Message.InputKeyboardMessage(e)).Send();
		if(!e.repeat && this.PreviousPlayerKeyState !== this.PlayerKeyState) {
			(new this.FuzzyKnights.Common.Message.InputPlayerKeyStateMessage(this.PlayerKeyState)).Send();
		}
	}

	FlagController(keyCode, isAdd = true) {
		for(let key in this.KeyBindings) {
			if(this.KeyBindings[key].includes(keyCode)) {
				if(!!isAdd) {
					this.PlayerKeyState = Bitwise.Add(this.PlayerKeyState, EnumPlayerKeyState[key]);
				} else {
					this.PlayerKeyState = Bitwise.Remove(this.PlayerKeyState, EnumPlayerKeyState[key]);
				}
			}
		}
	}
}

export default KeyHandler;