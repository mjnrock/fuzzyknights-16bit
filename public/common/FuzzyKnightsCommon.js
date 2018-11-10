import Common from "./package.js";

class FuzzyKnightsCommon {
	constructor(fk = {}) {
		this.FuzzyKnights = {
			...fk,
			Common
		};

		this.Initialize();
	}

	Initialize() {
		//@ GameManager
		this.FuzzyKnights.Common.Game.GameManager = new this.FuzzyKnights.Common.Game.GameManager(this.FuzzyKnights);

		//@ MessageManager
		this.FuzzyKnights.Common.Message.MessageManager = new this.FuzzyKnights.Common.Message.MessageManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddManager(this.FuzzyKnights.Common.Message.MessageManager);
		this.FuzzyKnights.Common.Message.Message.FuzzyKnights = this.FuzzyKnights;
		//@ PacketManager
		this.FuzzyKnights.Common.Message.Packet.PacketManager = new this.FuzzyKnights.Common.Message.Packet.PacketManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddManager(this.FuzzyKnights.Common.Message.Packet.PacketManager);
		//@ EntityManager
		this.FuzzyKnights.Common.Entity.EntityManager = new this.FuzzyKnights.Common.Entity.EntityManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddManager(this.FuzzyKnights.Common.Entity.EntityManager);
		//@ TileManager
		this.FuzzyKnights.Common.World.Tile.TileManager = new this.FuzzyKnights.Common.World.Tile.TileManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddManager(this.FuzzyKnights.Common.World.Tile.TileManager);
		//@ WorldManager
		this.FuzzyKnights.Common.World.WorldManager = new this.FuzzyKnights.Common.World.WorldManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddManager(this.FuzzyKnights.Common.World.WorldManager);
		

		//@ PlayerHandler
		this.FuzzyKnights.Common.Event.Handler.PlayerHandler = new this.FuzzyKnights.Common.Event.Handler.PlayerHandler(this.FuzzyKnights);
		//@ InputHandler
		this.FuzzyKnights.Common.Event.Handler.InputHandler = new this.FuzzyKnights.Common.Event.Handler.InputHandler(this.FuzzyKnights);
		//@ EntityHandler
		this.FuzzyKnights.Common.Event.Handler.EntityHandler = new this.FuzzyKnights.Common.Event.Handler.EntityHandler(this.FuzzyKnights);
		this.FuzzyKnights.Common.Event.Event.FuzzyKnights = this.FuzzyKnights;

		//@ Component Mutators
		this.FuzzyKnights.Common.Component.Mutator.Attributes = new this.FuzzyKnights.Common.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Resources = new this.FuzzyKnights.Common.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Maps = new this.FuzzyKnights.Common.Component.Mutator.Maps(this.FuzzyKnights);

		this.FuzzyKnights.Common.Game.GameLoop.Run();

		return this;
	}

	GetFuzzyKnights() {
		return this.FuzzyKnights;
	}
	SetFuzzyKnights(fk) {
		this.FuzzyKnights = fk;

		return this;
	}
}

export default FuzzyKnightsCommon;