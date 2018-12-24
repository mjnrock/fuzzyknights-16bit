import FKFiles from "./package.js";
import registry from "./registry.js"

class FuzzyKnights {
	constructor(fk = {}) {
		this.FuzzyKnights = FKFiles;
		this.Window = window;

		this.Init().PostInit().BuildEnvironment();
		this.RenderInit().RenderRegistry();

		console.log(this.FuzzyKnights.Game.GameManager);
		this.FuzzyKnights.Game.GameLoop.Run();
	}

	RenderInit() {
		//@ RenderManager
		this.FuzzyKnights.Render.RenderManager = new this.FuzzyKnights.Render.RenderManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddRenderManager(this.FuzzyKnights.Render.RenderManager);
		
		return this;
	}

	RenderRegistry() {
		let setup = registry(this.FuzzyKnights);
		console.log(setup);
		for(let i in setup) {
			this.FuzzyKnights.Render.RenderManager.LinkModel(setup[i][0], setup[i][1]);
		}

		//* These have to be moved into an appropriate Game invocation
		this.FuzzyKnights.Render.RenderManager.Register(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity());
		this.FuzzyKnights.World.MapManager.GetActiveMap().Grid.ForEach((pos, node, grid) => {
			let entity = node.GetTerrain()[0];
			this.FuzzyKnights.Component.Mutator.Maps.SetPosition(entity, pos.X, pos.Y);
			this.FuzzyKnights.Render.RenderManager.Register(entity, true);
		});
		
		return this;
	}

	Init() {
		//@ GameManager
		this.FuzzyKnights.Game.GameManager = new this.FuzzyKnights.Game.GameManager(this.FuzzyKnights);

		//@ MessageManager
		this.FuzzyKnights.Message.MessageManager = new this.FuzzyKnights.Message.MessageManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddTickManager(this.FuzzyKnights.Message.MessageManager);
		this.FuzzyKnights.Message.Message.FuzzyKnights = this.FuzzyKnights;
		//@ EntityManager
		this.FuzzyKnights.Entity.EntityManager = new this.FuzzyKnights.Entity.EntityManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddTickManager(this.FuzzyKnights.Entity.EntityManager);
		//@ MapManager
		this.FuzzyKnights.World.MapManager = new this.FuzzyKnights.World.MapManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddTickManager(this.FuzzyKnights.World.MapManager);
		//@ WorldManager
		this.FuzzyKnights.World.WorldManager = new this.FuzzyKnights.World.WorldManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddTickManager(this.FuzzyKnights.World.WorldManager);
		

		//@ PlayerHandler
		this.FuzzyKnights.Event.Handler.PlayerHandler = new this.FuzzyKnights.Event.Handler.PlayerHandler(this.FuzzyKnights);
		//@ InputHandler
		this.FuzzyKnights.Event.Handler.InputHandler = new this.FuzzyKnights.Event.Handler.InputHandler(this.FuzzyKnights);
		//@ EntityHandler
		this.FuzzyKnights.Event.Handler.EntityHandler = new this.FuzzyKnights.Event.Handler.EntityHandler(this.FuzzyKnights);

		
		//@ KeyListener
		this.FuzzyKnights.Event.Listener.KeyListener = new this.FuzzyKnights.Event.Listener.KeyListener(this.FuzzyKnights);
		this.FuzzyKnights.Event.Listener.MouseListener = new this.FuzzyKnights.Event.Listener.MouseListener(this.FuzzyKnights);


		//@ Component Mutators
		this.FuzzyKnights.Component.Mutator.Attributes = new this.FuzzyKnights.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Resources = new this.FuzzyKnights.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Maps = new this.FuzzyKnights.Component.Mutator.Maps(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.CreatureInfo = new this.FuzzyKnights.Component.Mutator.CreatureInfo(this.FuzzyKnights);

		this.FuzzyKnights.Network.ConnectionClient = new this.FuzzyKnights.Network.ConnectionClient(this.FuzzyKnights);

		return this;
	}

	//	Build the game for the player
	BuildEnvironment() {
		let Map = this.FuzzyKnights.World.MapGenerator.RandomAverage(10, 7).GetMap();
		let Player = new this.FuzzyKnights.Game.Player("Mr. Fuzzums", new this.FuzzyKnights.Entity.Creature.Raccoon());

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
		this.FuzzyKnights.Render.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
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