class InputHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onInputMouseMessage(msg) {
		// console.log(...arguments);
		if(msg.Payload.Event.type === "mousemove") {
			let x = msg.Payload.Event.clientX / 128,
				y = msg.Payload.Event.clientY / 128,
				pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()),
				xo = pos.X + 0.5,	// + (TILE WIDTH / 2)	// Position is Left,Top otherwise
				yo = pos.Y + 0.5,	// + (TILE WIDTH / 2)	// Position is Left,Top otherwise
				d = Math.atan2(xo - x, yo - y) / Math.PI * 180,
				sectors = 4,
				sArc = 360 / sectors;

			if(d < 0) {
				d += 360;
			}
			d = Math.abs(d - 360);

			let deg = (Math.floor((d + (sArc / 2)) / sArc) * sArc) % 360;

			this.FuzzyKnights.Component.Mutator.Maps.SetRotation(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(), deg);
		}
	}

	onInputKeyboard(msg) {
		console.log(...arguments);
	}

	onInputPlayerKeyState(msg, state) {
		// console.log(...arguments);
		let vel = this.FuzzyKnights.Component.Mutator.CreatureInfo.GetSpeed(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()),
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
		// console.log(JSON.stringify(this.FuzzyKnights.Component.Mutator.Maps.GetVelocity(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity())));
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