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

		CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r, fill, stroke) {
			if (typeof stroke == 'undefined') {
				stroke = true;
			}
			if (typeof r === 'undefined') {
				r = 5;
			}
			if (typeof r === 'number') {
				r = {tl: r, tr: r, br: r, bl: r};
			} else {
				let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
				for (let side in defaultRadius) {
					r[side] = r[side] || defaultRadius[side];
				}
			}
			this.beginPath();
			this.moveTo(x + r.tl, y);
			this.lineTo(x + w - r.tr, y);
			this.quadraticCurveTo(x + w, y, x + w, y + r.tr);
			this.lineTo(x + w, y + h - r.br);
			this.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
			this.lineTo(x + r.bl, y + h);
			this.quadraticCurveTo(x, y + h, x, y + h - r.bl);
			this.lineTo(x, y + r.tl);
			this.quadraticCurveTo(x, y, x + r.tl, y);
			this.closePath();

			if (fill) {
				this.fillStyle = fill;
			  	this.fill();
			}
			if (stroke) {
				this.stroke();
			}

			return this;
		};
		
		return this;
	}

	/**
	 * Read from the imported "registry" and create Entity.Entity-Render.Entity links for client-only properties (e.g. images)
	 * NOTE: If the pimport Camera from "./render/drawing/Camera";
aradigm is reworked to dynamically read the image alphas for collision masking, this registry will need to move to Common
	 */
	RenderRegistry() {
		let setup = registry(this.FuzzyKnights);
		for(let i in setup) {
			this.FuzzyKnights.Render.RenderManager.LinkModel(setup[i][0], setup[i][1]);
		}

		//* These have to be moved into an appropriate Game invocation
		// this.FuzzyKnights.Render.RenderManager.Register(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity());

		let zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity());
		zone.Terrain.ForEach((pos, terrain, em) => {
			this.FuzzyKnights.Render.RenderManager.Register(terrain, true);
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
		this.FuzzyKnights.Component.Mutator.Physics = new this.FuzzyKnights.Component.Mutator.Physics(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Attributes = new this.FuzzyKnights.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Resources = new this.FuzzyKnights.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.States = new this.FuzzyKnights.Component.Mutator.States(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.CreatureInfo = new this.FuzzyKnights.Component.Mutator.CreatureInfo(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.TerrainInfo = new this.FuzzyKnights.Component.Mutator.TerrainInfo(this.FuzzyKnights);
		this.FuzzyKnights.Component.Mutator.Worlds = new this.FuzzyKnights.Component.Mutator.Worlds(this.FuzzyKnights);

		this.FuzzyKnights.Network.ConnectionClient = new this.FuzzyKnights.Network.ConnectionClient(this.FuzzyKnights);

		return this;
	}

	//	As of now, used strictly to have something to test on the screen
	BuildEnvironment() {
		let Zone = this.FuzzyKnights.World.ZoneGenerator.RandomAverage(20, 20).GetZone(
			[ 0, 100, this.FuzzyKnights.Entity.Terrain.Water ],
			[ 100, 125, this.FuzzyKnights.Entity.Terrain.Sand ],
			[ 125, 255, this.FuzzyKnights.Entity.Terrain.Grass ]
		);
		let Dimension = this.FuzzyKnights.World.Dimension.Generate(null, [
			Zone
		]);
		this.FuzzyKnights.World.WorldManager.AddDimension(Dimension);

		let Player = new this.FuzzyKnights.Game.Player("Mr. Fuzzums", new this.FuzzyKnights.Entity.Creature.Raccoon());
		this.FuzzyKnights.Game.GameManager.SetPlayer(Player);
		this.FuzzyKnights.World.WorldManager.AddPlayer(Player);

		this.FuzzyKnights.Component.Mutator.Worlds.SetZone(Player.Entity, Zone);
		this.FuzzyKnights.Component.Mutator.Worlds.SetPoint(Player.Entity, 2, 2);

		// let Enemy = new this.FuzzyKnights.Entity.Creature.Beaver();
		// this.FuzzyKnights.Component.Mutator.Worlds.SetZone(Enemy, Zone);
		// this.FuzzyKnights.Component.Mutator.Worlds.SetPoint(Enemy, 3, 3);

		//! This doesn't presently render (when it has decimals)
		// this.FuzzyKnights.Component.Mutator.Worlds.SetPoint(Enemy, 3.1, 3.1);

		return this;
	}

	/**
	 * Allow for injections of the FuzzyKnights object into the prototypes for static access of the runtime version
	 */
	PostInit() {
		//@ Apply FuzzyKnight Hooks
		this.FuzzyKnights.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Render.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Render.Drawing.Canvas.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Render.Drawing.Cinematograph.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Render.Drawing.ViewPort.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Event.Event.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Message.Message.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.World.Zone.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Game.Player.FuzzyKnights = this.FuzzyKnights;

		//DEBUG
		this.FuzzyKnights.World.ZoneGenerator.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Utility.Drawing.Canvas.FuzzyKnights = this.FuzzyKnights;

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