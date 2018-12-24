class InputHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onInputMouseMessage(msg) {
		// console.log(...arguments);
		if(msg.Payload.Event.type === "mousemove") {
			let x = msg.Payload.Event.clientX,
				y = msg.Payload.Event.clientY,
				pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()),
				xo = pos.X * 128,
				yo = pos.Y * 128,
				d = Math.atan2(yo - y, xo - x) * (180 / Math.PI),
				deg = 0;

			if(d >= 45 && d <= 135) {
				// N
				deg = 0;
			} else if((d >= 135 && d <= 180) || (d >= -180 && d <= -135)) {
				// E
				deg = 90;
			} else if(d >= -135 && d <= -35) {
				// S
				deg = 180;
			} else {
				// W
				deg = 270;
			} 

			this.FuzzyKnights.Component.Mutator.Maps.SetRotation(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(), deg);
		}
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
		} else if(msg.MessageType === "InputMouseMessage") {
			this.onInputMouseMessage(msg, ...payload);
		}
	}
	ReceiveMessage(msg, time = null) {
		this.ProcessMessage(msg);

		if(this.FuzzyKnights.IsServer) {
			console.log(`[MESSAGE RECEIVED - InputHander]: ${msg.MessageType}`);
		} else {
			// console.log(`[MESSAGE RECEIVED]: ${msg.MessageType}`, msg);
			// console.log(`[MESSAGE RECEIVED - InputHander]: ${msg.MessageType}`);
		}
	}
}

export { InputHandler };