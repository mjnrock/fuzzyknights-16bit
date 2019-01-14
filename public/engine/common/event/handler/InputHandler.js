class InputHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onInputMouseMessage(msg, ...payload) {
		// console.log(...arguments);
		if(msg.Payload.Event.type === "mousemove") {
			this.OnMouseMove(msg, ...payload);
		} else if(msg.Payload.Event.type === "mousedown") {
			this.OnMouseDown(msg, ...payload);
			this.OnMouseMove(msg, ...payload);
		} else if(msg.Payload.Event.type === "mouseup") {
			this.OnMouseUp(msg, ...payload);
			this.OnMouseMove(msg, ...payload);
		}
	}
	OnMouseMove(msg, event) {
		let x = event.clientX,
			y = event.clientY,
			// pos = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetPoint(this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity()),

			//! These will be relevant again once this Handler becomes aware of the ViewPort
			// xo = pos.X + 0.5,	// + (TILE WIDTH / 2)	// Position is Left,Top otherwise
			// yo = pos.Y + 0.5,	// + (TILE WIDTH / 2)	// Position is Left,Top otherwise
			
			xo = window.innerWidth / 2,
			yo = window.innerHeight / 2,
			d = Math.atan2(xo - x, yo - y) / Math.PI * 180,
			sectors = 8,
			sArc = 360 / sectors;

		if(d < 0) {
			d += 360;
		}
		d = Math.abs(d - 360);
		
		let deg = (Math.floor((d + (sArc / 2)) / sArc) * sArc) % 360 || 0;

		this.FuzzyKnights.Common.Component.Mutator.Worlds.SetAngle(this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity(), deg);
	}
	OnMouseDown(msg, event) {
		let tx = Math.floor(event.clientX / this.FuzzyKnights.Common.Game.Settings.View.Tile.Width),
			ty = Math.floor(event.clientY / this.FuzzyKnights.Common.Game.Settings.View.Tile.Height);

		if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Primary === +event.button) {			
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Secondary === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Auxillary === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Button4 === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Button5 === +event.button) {
		}
	}
	OnMouseUp(msg, event) {
		let tx = Math.floor(event.clientX / this.FuzzyKnights.Common.Game.Settings.View.Tile.Width),
			ty = Math.floor(event.clientY / this.FuzzyKnights.Common.Game.Settings.View.Tile.Height);

		if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Primary === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Secondary === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Auxillary === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Button4 === +event.button) {
		} else if(this.FuzzyKnights.Common.Game.Settings.Input.Mouse.Button5 === +event.button) {
		}
	}

	onInputKeyboard(msg, event) {
		if(this.FuzzyKnights.Common.Game.Settings.Bindings.DebugMode.includes(event.key)) {
			this.FuzzyKnights.Common.Game.Settings.View.DebugMode = !this.FuzzyKnights.Common.Game.Settings.View.DebugMode;
		} else if(this.FuzzyKnights.Common.Game.Settings.Bindings.HUD.includes(event.key)) {
			this.FuzzyKnights.Common.Game.Settings.View.HUD = !this.FuzzyKnights.Common.Game.Settings.View.HUD;
		} else if(this.FuzzyKnights.Common.Game.Settings.Bindings.CameraFollow.includes(event.key)) {
			this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.IsTracking = !this.FuzzyKnights.Client.Render.RenderManager.ViewPort.Camera.IsTracking;
		} else if(this.FuzzyKnights.Common.Game.Settings.Bindings.Movement.Stop.includes(event.key)) {
			this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinetics(this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity()).ResetKinetics();
		}
	}

	onInputPlayerKeyState(msg, state) {
		this.FuzzyKnights.Common.Game.GameManager.GetPlayer().SetKeyState(state);
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