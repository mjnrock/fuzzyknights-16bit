class InputHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onInputMouseMessage(msg) {
		// console.log(...arguments);
		if(msg.Payload.Event.type === "mousemove") {
			this.OnMouseMove(msg);
		} else if(msg.Payload.Event.type === "mousedown") {
			this.OnMouseDown(msg);
		} else if(msg.Payload.Event.type === "mouseup") {
			this.OnMouseUp(msg);
		}
	}
	OnMouseMove(msg) {
		let x = msg.Payload.Event.clientX / this.FuzzyKnights.Game.Settings.View.Tile.Width,
			y = msg.Payload.Event.clientY / this.FuzzyKnights.Game.Settings.View.Tile.Height,
			pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity()),
			xo = pos.X + 0.5,	// + (TILE WIDTH / 2)	// Position is Left,Top otherwise
			yo = pos.Y + 0.5,	// + (TILE WIDTH / 2)	// Position is Left,Top otherwise
			d = Math.atan2(xo - x, yo - y) / Math.PI * 180,
			sectors = 8,
			sArc = 360 / sectors;

		if(d < 0) {
			d += 360;
		}
		d = Math.abs(d - 360);
		
		let deg = (Math.floor((d + (sArc / 2)) / sArc) * sArc) % 360 || 0;

		this.FuzzyKnights.Component.Mutator.Maps.SetRotation(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(), deg);
	}
	OnMouseDown(msg) {
		let tx = Math.floor(msg.Payload.Event.clientX / this.FuzzyKnights.Game.Settings.View.Tile.Width),
			ty = Math.floor(msg.Payload.Event.clientY / this.FuzzyKnights.Game.Settings.View.Tile.Height);

		// console.log(tx, ty);
	}
	OnMouseUp(msg) {
		let tx = Math.floor(msg.Payload.Event.clientX / this.FuzzyKnights.Game.Settings.View.Tile.Width),
			ty = Math.floor(msg.Payload.Event.clientY / this.FuzzyKnights.Game.Settings.View.Tile.Height);

		// console.log(msg);

		// console.log(tx, ty);
		//TODO Creatures are not currently stored in Nodes
		console.log(this.FuzzyKnights.Game.GameManager.Player.Entity);
		console.log(this.FuzzyKnights.World.MapManager.GetActiveMap().GetNode(tx, ty).GetEntityArray());
		console.log(this.FuzzyKnights.World.MapManager.GetActiveMap().GetNode(tx, ty).HasCreatures());
	}

	onInputKeyboard(msg, event) {
		if(this.FuzzyKnights.Game.Settings.Bindings.DebugMode.includes(event.keyCode)) {
			this.FuzzyKnights.Game.Settings.View.DebugMode = !this.FuzzyKnights.Game.Settings.View.DebugMode;
		} else if(event.code === "Space") {
			// Invoke interaction
		}
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