import Bitwise from "../../utility/Bitwise.js";
import EnumPlayerKeyState from "../../enum/bitwise/PlayerKeyState.js";

class KeyListener {
	constructor(fk) {
		this.FuzzyKnights = fk;

		this.Exclusions = [
			"F5",
			"F11",
			"F12",
			"ShiftLeft"
		];

		this.PreviousPlayerKeyState = null;
		this.PlayerKeyState = EnumPlayerKeyState.IDLE;

		window.addEventListener("keyup", this.OnKeyUp.bind(this), false);
		window.addEventListener("keydown", this.OnKeyDown.bind(this), false);
	}

	OnKeyUp(e) {
		if(!this.Exclusions.includes(e.key)) {
			e.preventDefault();
		}

		this.FlagController(e.key, false);		
		this.FuzzyKnights.Event.Spawn.InputPlayerKeyStateEvent(this.PlayerKeyState);
		this.FuzzyKnights.Event.Spawn.InputKeyboardEvent(e);
	}

	//*	e.repeat === true allows detection of a continuous press
	OnKeyDown(e) {
		if(!this.Exclusions.includes(e.key)) {
			e.preventDefault();
		}

		this.PreviousPlayerKeyState = this.PlayerKeyState;
		this.FlagController(e.key, true);
		
		// if(this.PreviousPlayerKeyState !== this.PlayerKeyState) {
		// 	this.FuzzyKnights.Event.Spawn.InputPlayerKeyStateEvent(this.PlayerKeyState);
		// }
		this.FuzzyKnights.Event.Spawn.InputPlayerKeyStateEvent(this.PlayerKeyState);
		// this.FuzzyKnights.Event.Spawn.InputKeyboardEvent(e);
	}

	FlagController(eventKey, isAdd = true) {
		for(let key in this.FuzzyKnights.Game.Settings.Bindings.Movement) {
			if(this.FuzzyKnights.Game.Settings.Bindings.Movement[key].includes(eventKey)) {
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