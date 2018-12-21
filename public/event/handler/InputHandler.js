class InputHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onInputKeyboard(msg) {
		console.log(...arguments);
	}

	onInputPlayerKeyState(msg, state) {
		// console.log(...arguments);

		let vel = this.FuzzyKnights.Game.GameManager.Settings.Movement.Velocity,
			x = 0,
			y = 0,
			r = 0;

		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.LEFT)) {
			x += -vel;
		}
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.RIGHT)) {
			x += vel;
		}
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.UP)) {
			y += -vel;
		}
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.DOWN)) {
			y += vel;
		}

		this.FuzzyKnights.Component.Mutator.Maps.SetVelocity(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(), x, y, r);

		//	DEBUG
		console.log(JSON.stringify(this.FuzzyKnights.Component.Mutator.Maps.GetVelocity(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity())));
	}

	ProcessMessage(msg) {
		let payload = Object.values(msg.Payload);
		if(msg.MessageType === "InputPlayerKeyStateMessage") {
			this.onInputPlayerKeyState(msg, ...payload);
		} else if(msg.MessageType === "InputKeyboardMessage") {
			this.onInputKeyboard(msg, ...payload);
		}
	}
	ReceiveMessage(msg, time = null) {
		this.ProcessMessage(msg);

		if(this.FuzzyKnights.IsServer) {
			console.log(`[MESSAGE RECEIVED - InputHander]: ${msg.MessageType}`);
		} else {
			// console.log(`[MESSAGE RECEIVED]: ${msg.MessageType}`, msg);
			console.log(`[MESSAGE RECEIVED - InputHander]: ${msg.MessageType}`);
		}
	}
}

export { InputHandler };