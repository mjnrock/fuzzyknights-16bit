import FKFiles from "./package.js";
import registry from "./registry.js"
import settings from "./settings.js"

class FuzzyKnights {
	constructor(fk = {}) {
		this.FuzzyKnights = FKFiles;
		this.Window = window;

		this.Init().PostInit().BuildEnvironment();
		this.RenderInit().RenderRegistry();

		this.FuzzyKnights.Game.GameLoop.Run();
	}

	/**
	 * Fragmented Init() for the Render classes, to make Client/Common segmentation easier
	 */
	RenderInit() {
		//@ RenderManager
		this.FuzzyKnights.Render.RenderManager = new this.FuzzyKnights.Render.RenderManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddRenderManager(this.FuzzyKnights.Render.RenderManager);
		
		return this;
	}

	/**
	 * Read from the imported "registry" and create Entity.Entity-Render.Entity links for client-only properties (e.g. images)
	 * NOTE: If the paradigm is reworked to dynamically read the image alphas for collision masking, this registry will need to move to Common
	 */
	RenderRegistry() {
		let setup = registry(this.FuzzyKnights);
		for(let i in setup) {
			this.FuzzyKnights.Render.RenderManager.LinkModel(setup[i][0], setup[i][1]);
		}

		//* These have to be moved into an appropriate Game invocation
		// this.FuzzyKnights.Render.RenderManager.Register(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity());
		this.FuzzyKnights.World.MapManager.GetActiveMap().Grid.ForEach((pos, node, grid) => {
			let entity = node.GetTerrain()[0];
			this.FuzzyKnights.Component.Mutator.Maps.SetHeading(entity, pos.X, pos.Y, 0);
			this.FuzzyKnights.Render.RenderManager.Register(entity, true);
		});
		
		return this;
	}

	/**
	 * Overwrite certain base classes with an instance of that same class, instead.
	 * This paradigm is the default expectation for any: [ Manager, Handler, Listener, Mutator ]
	 */
	Init() {
		//@ Clone Settings Object
		this.FuzzyKnights.Game.Settings = JSON.parse(JSON.stringify(settings));

		//@ GameManager
		this.FuzzyKnights.Game.GameManager = new this.FuzzyKnights.Game.GameManager(this.FuzzyKnights);

		//@ MessageManager
		this.FuzzyKnights.Message.MessageManager = new this.FuzzyKnights.Message.MessageManager(this.FuzzyKnights);
		this.FuzzyKnights.Game.GameManager.AddTickManager(this.FuzzyKnights.Message.MessageManager);
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
		this.FuzzyKnights.Component.Mutator.RigidBody = new this.FuzzyKnights.Component.Mutator.RigidBody(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Attributes = new this.FuzzyKnights.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Resources = new this.FuzzyKnights.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Maps = new this.FuzzyKnights.Component.Mutator.Maps(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.States = new this.FuzzyKnights.Component.Mutator.States(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.CreatureInfo = new this.FuzzyKnights.Component.Mutator.CreatureInfo(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.TerrainInfo = new this.FuzzyKnights.Component.Mutator.TerrainInfo(this.FuzzyKnights);

		this.FuzzyKnights.Network.ConnectionClient = new this.FuzzyKnights.Network.ConnectionClient(this.FuzzyKnights);

		return this;
	}

	//	As of now, used strictly to have something to test on the screen
	BuildEnvironment() {
		let Map = this.FuzzyKnights.World.MapGenerator.RandomAverage(10, 7).GetMap(
			[ 0, 255, this.FuzzyKnights.Entity.Terrain.Grass ]
		);
		// let Map = this.FuzzyKnights.World.MapGenerator.RandomAverage(10, 7).GetMap(
		// 	[ 0, 100, this.FuzzyKnights.Entity.Terrain.Water ],
		// 	[ 100, 125, this.FuzzyKnights.Entity.Terrain.Sand ],
		// 	[ 125, 255, this.FuzzyKnights.Entity.Terrain.Grass ]
		// );
		let Player = new this.FuzzyKnights.Game.Player("Mr. Fuzzums", new this.FuzzyKnights.Entity.Creature.Beaver());

		let Enemy = new this.FuzzyKnights.Entity.Creature.Raccoon();

		this.FuzzyKnights.World.MapManager.SetMap(0, 0, Map);
		this.FuzzyKnights.World.MapManager.SetActiveMap(Map.UUID);
		this.FuzzyKnights.Game.GameManager.SetPlayer(Player);

		this.FuzzyKnights.Component.Mutator.Maps.SetMap(Player.Entity, Map);
		this.FuzzyKnights.Component.Mutator.Maps.SetPosition(Player.Entity, 0, 0);

		console.log(Enemy);
		this.FuzzyKnights.Component.Mutator.Maps.SetMap(Enemy, Map);
		this.FuzzyKnights.Component.Mutator.Maps.SetPosition(Enemy, 2, 2);

		return this;
	}

	/**
	 * Allow for injections of the FuzzyKnights object into the prototypes for static access of the runtime version
	 */
	PostInit() {
		//@ Apply FuzzyKnight Hooks
		this.FuzzyKnights.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Render.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Event.Event.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Message.Message.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.World.Map.FuzzyKnights = this.FuzzyKnights;

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