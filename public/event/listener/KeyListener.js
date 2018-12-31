import Bitwise from "../../utility/Bitwise.js";
import EnumPlayerKeyState from "../../enum/bitwise/PlayerKeyState.js";

class KeyListener {
	constructor(fk) {
		this.FuzzyKnights = fk;

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
		this.FuzzyKnights.Event.Spawn.InputPlayerKeyStateEvent(this.PlayerKeyState);
		this.FuzzyKnights.Event.Spawn.InputKeyboardEvent(e);
	}

	//*	e.repeat === true allows detection of a continuous press
	OnKeyDown(e) {
		if(e.keyCode !== 116 && e.keyCode !== 16) {		//! [F5] & [Shift]
			e.preventDefault();
		}

		this.PreviousPlayerKeyState = this.PlayerKeyState;
		this.FlagController(e.keyCode, true);
		
		if(this.PreviousPlayerKeyState !== this.PlayerKeyState) {
			this.FuzzyKnights.Event.Spawn.InputPlayerKeyStateEvent(this.PlayerKeyState);
		}
	}

	FlagController(keyCode, isAdd = true) {
		for(let key in this.FuzzyKnights.Game.Settings.Bindings.Movement) {
			if(this.FuzzyKnights.Game.Settings.Bindings.Movement[key].includes(keyCode)) {
				if(!!isAdd) {
					this.PlayerKeyState = Bitwise.Add(this.PlayerKeyState, EnumPlayerKeyState[key.toUpperCase()]);
				} else {
					this.PlayerKeyState = Bitwise.Remove(this.PlayerKeyState, EnumPlayerKeyState[key.toUpperCase()]);
				}
			}
		}
	}
}

export { KeyListener };