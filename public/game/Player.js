import { NewUUID } from "./../utility/Functions.js";

class Player {
	constructor(name, entity) {
		this.Name = name;
		this.Entity = entity;
		this.KeyState = 0;

		this.UUID = NewUUID();
		this.Timestamp = Date.now();
	}

	GetUUID() {
		return this.UUID;
	}
	SetUUID(uuid) {
		this.UUID = uuid;

		return this;
	}

	GetName() {
		return this.Name;
	}
	SetName(name) {
		this.Name = name;

		return this;
	}

	GetKeyState() {
		return this.KeyState;
	}
	SetKeyState(state) {
		this.KeyState = state;

		return this;
	}

	GetEntity() {
		return this.Entity;
	}
	SetEntity(entity) {
		this.Entity = entity;

		return this;
	}

	Tick(time) {
		if(this.KeyState !== 0) {
			//? Force Based
			let magnitude = 3,
				x = 0,
				y = 0,
				r = 0;

			if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.LEFT)) {
				x += -magnitude;
			}
			if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.RIGHT)) {
				x += magnitude;
			}
			if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.UP)) {
				y += -magnitude;
			}
			if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.DOWN)) {
				y += magnitude;
			}

			Player.FuzzyKnights.Component.Mutator.Physics.AddForce(
				this.Entity,
				Player.FuzzyKnights.Physics.D2.Force.Generate(x, y, r)
			);

			//? Velocity Based
			// let vel = Player.FuzzyKnights.Component.Mutator.CreatureInfo.GetSpeed(this.Entity),
			// 	x = 0,
			// 	y = 0,
			// 	r = 0;

			// if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.LEFT)) {
			// 	x += -vel;
			// }
			// if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.RIGHT)) {
			// 	x += vel;
			// }
			// if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.UP)) {
			// 	y += -vel;
			// }
			// if(Player.FuzzyKnights.Utility.Bitwise.Has(this.KeyState, Player.FuzzyKnights.Enum.Bitwise.PlayerKeyState.DOWN)) {
			// 	y += vel;
			// }

			// Player.FuzzyKnights.Component.Mutator.Physics.SetVelocity(this.Entity, Player.FuzzyKnights.Physics.D2.Velocity.Generate(x, y));


			// console.log(JSON.stringify(Player.FuzzyKnights.Component.Mutator.Physics.GetKinetics(this.Entity).Get()));
		}

		

		// //? Force Based
		// let magnitude = 10.00,
		// 	x = 0,
		// 	y = 0,
		// 	r = 0;

		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.LEFT)) {
		// 	x += -magnitude;
		// }
		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.RIGHT)) {
		// 	x += magnitude;
		// }
		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.UP)) {
		// 	y += -magnitude;
		// }
		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.DOWN)) {
		// 	y += magnitude;
		// }

		// this.FuzzyKnights.Component.Mutator.Physics.AddForce(
		// 	this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
		// 	this.FuzzyKnights.Physics.D2.Force.Generate(x, y, r)
		// );

		// let entity = this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
		// 	vel = this.FuzzyKnights.Component.Mutator.CreatureInfo.GetSpeed(entity),
		// 	x = 0,
		// 	y = 0,
		// 	r = 0;

		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.LEFT)) {
		// 	x += -vel;
		// }
		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.RIGHT)) {
		// 	x += vel;
		// }
		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.UP)) {
		// 	y += -vel;
		// }
		// if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.DOWN)) {
		// 	y += vel;
		// }

		// this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(entity, this.FuzzyKnights.Physics.D2.Velocity.Generate(x, y));
	}
}

export { Player };