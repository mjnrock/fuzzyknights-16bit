import FKFiles from "./package.js";

class FuzzyKnights {
	constructor(fk = {}) {
		this.FuzzyKnights = FKFiles;
		this.Window = window;

		this.Initialize();
	}

	Initialize() {
		//@ GameManager
		this.FuzzyKnights.Game.GameManager = new this.FuzzyKnights.Game.GameManager(this.FuzzyKnights);

		//@ MessageManager
		this.FuzzyKnights.Message.MessageManager = new this.FuzzyKnights.Message.MessageManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.Message.MessageManager);
		this.FuzzyKnights.Message.Message.FuzzyKnights = this.FuzzyKnights;
		//@ EntityManager
		this.FuzzyKnights.Entity.EntityManager = new this.FuzzyKnights.Entity.EntityManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.Entity.EntityManager);
		//@ TileManager
		this.FuzzyKnights.World.Tile.TileManager = new this.FuzzyKnights.World.Tile.TileManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.World.Tile.TileManager);
		//@ WorldManager
		this.FuzzyKnights.World.WorldManager = new this.FuzzyKnights.World.WorldManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.World.WorldManager);
		

		//@ PlayerHandler
		this.FuzzyKnights.Event.Handler.PlayerHandler = new this.FuzzyKnights.Event.Handler.PlayerHandler(this.FuzzyKnights);
		//@ InputHandler
		this.FuzzyKnights.Event.Handler.InputHandler = new this.FuzzyKnights.Event.Handler.InputHandler(this.FuzzyKnights);
		//@ EntityHandler
		this.FuzzyKnights.Event.Handler.EntityHandler = new this.FuzzyKnights.Event.Handler.EntityHandler(this.FuzzyKnights);
		this.FuzzyKnights.Event.Event.FuzzyKnights = this.FuzzyKnights;

		
		//@ KeyListener
		this.FuzzyKnights.Event.Listener.KeyListener = new this.FuzzyKnights.Event.Listener.KeyListener(this.FuzzyKnights);

		//@ Component Mutators
		this.FuzzyKnights.Component.Mutator.Attributes = new this.FuzzyKnights.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Resources = new this.FuzzyKnights.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Maps = new this.FuzzyKnights.Component.Mutator.Maps(this.FuzzyKnights);

		this.FuzzyKnights.Game.GameLoop.Run();

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

export default FuzzyKnights;