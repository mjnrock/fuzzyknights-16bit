import FKFiles from "./package.js";

class FuzzyKnights {
	constructor(fk = {}) {
		this.FuzzyKnights = FKFiles;
		this.Window = window;

		this.Init().BuildPlayer().PostInit();
		this.RenderInit();

		this.FuzzyKnights.Game.GameLoop.Run();
	}

	RenderInit() {
		//@ RenderManager
		this.FuzzyKnights.Render.ViewPort = new this.FuzzyKnights.Render.RenderManager(this.FuzzyKnights, "viewport");
		
		return this;
	}

	Init() {
		//@ GameManager
		this.FuzzyKnights.Game.GameManager = new this.FuzzyKnights.Game.GameManager(this.FuzzyKnights);

		//@ MessageManager
		this.FuzzyKnights.Message.MessageManager = new this.FuzzyKnights.Message.MessageManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.Message.MessageManager);
		this.FuzzyKnights.Message.Message.FuzzyKnights = this.FuzzyKnights;
		//@ EntityManager
		this.FuzzyKnights.Entity.EntityManager = new this.FuzzyKnights.Entity.EntityManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.Entity.EntityManager);
		//@ MapManager
		this.FuzzyKnights.World.MapManager = new this.FuzzyKnights.World.MapManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.World.MapManager);
		//@ WorldManager
		this.FuzzyKnights.World.WorldManager = new this.FuzzyKnights.World.WorldManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddManager(this.FuzzyKnights.World.WorldManager);
		

		//@ PlayerHandler
		this.FuzzyKnights.Event.Handler.PlayerHandler = new this.FuzzyKnights.Event.Handler.PlayerHandler(this.FuzzyKnights);
		//@ InputHandler
		this.FuzzyKnights.Event.Handler.InputHandler = new this.FuzzyKnights.Event.Handler.InputHandler(this.FuzzyKnights);
		//@ EntityHandler
		this.FuzzyKnights.Event.Handler.EntityHandler = new this.FuzzyKnights.Event.Handler.EntityHandler(this.FuzzyKnights);

		
		//@ KeyListener
		this.FuzzyKnights.Event.Listener.KeyListener = new this.FuzzyKnights.Event.Listener.KeyListener(this.FuzzyKnights);


		//@ Component Mutators
		this.FuzzyKnights.Component.Mutator.Attributes = new this.FuzzyKnights.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Resources = new this.FuzzyKnights.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Maps = new this.FuzzyKnights.Component.Mutator.Maps(this.FuzzyKnights);

		this.FuzzyKnights.Network.ConnectionClient = new this.FuzzyKnights.Network.ConnectionClient(this.FuzzyKnights);

		return this;
	}

	//	Build the game for the player
	BuildPlayer() {
		let Map = this.FuzzyKnights.World.MapGenerator.RandomAverage(5, 5).GetMap();
		let Player = new this.FuzzyKnights.Game.Player("Mr. Fuzzums", new this.FuzzyKnights.Entity.Creature.Creature());

		this.FuzzyKnights.World.MapManager.SetMap(0, 0, Map);
		this.FuzzyKnights.World.MapManager.SetActiveMap(Map.UUID);
		this.FuzzyKnights.Game.GameManager.SetPlayer(Player);

		this.FuzzyKnights.Component.Mutator.Maps.SetMap(Player.Entity, Map);

		this.FuzzyKnights.Entity.EntityManager.Register(Player.Entity);
		console.log(Player);

		return this;
	}

	PostInit() {
		//@ Major Components' FuzzyKnight Hook
		this.FuzzyKnights.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Event.Event.FuzzyKnights = this.FuzzyKnights;

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