import FKFiles from "./package.js";
import ModLoader from "./ModLoader.js";

import registry from "../config/registry.js"
import settings from "../config/settings.js"

const FuzzyKnights = FKFiles;
class FKGE {
	constructor(fk = {}, mods = []) {
		this.FuzzyKnights = FuzzyKnights;
		this.Mods = mods;
		this.Window = window;

		ModLoader.Install(this);

		this.Init().PostInit().BuildEnvironment();
		this.RenderInit().RenderRegistry();

		this.FuzzyKnights.Common.Game.GameLoop.Run();
	}

	/**
	 * Fragmented Init() for the Render classes, to make Client/Common segmentation easier
	 */
	RenderInit() {
		//@ RenderManager
		this.FuzzyKnights.Client.Render.RenderManager = new this.FuzzyKnights.Client.Render.RenderManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddRenderManager(this.FuzzyKnights.Client.Render.RenderManager);

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
aradigm is reworkeimport ModLoader from "./ModLoader";
d to dynamically read the image alphas for collision masking, this registry will need to move to Common
	 */
	RenderRegistry() {
		let setup = registry(this.FuzzyKnights);
		for(let i in setup) {
			this.FuzzyKnights.Client.Render.RenderManager.LinkModel(setup[i][0], setup[i][1]);
		}

		//* These have to be moved into an appropriate Game invocation
		// this.FuzzyKnights.Client.Render.RenderManager.Register(this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity());

		let zone = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetZone(this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity());
		zone.Terrain.ForEach((pos, terrain, em) => {
			this.FuzzyKnights.Client.Render.RenderManager.Register(terrain, true);
		});
		
		return this;
	}

	/**
	 * Overwrite certain base classes with an instance of that same class, instead.
	 * This paradigm is the default expectation for any: [ Manager, Handler, Listener, Mutator ]
	 */
	Init() {
		//@ Clone Settings Object
		this.FuzzyKnights.Common.Game.Settings = JSON.parse(JSON.stringify(settings));

		//@ GameManager
		this.FuzzyKnights.Common.Game.GameManager = new this.FuzzyKnights.Common.Game.GameManager(this.FuzzyKnights);

		//@ MessageManager
		this.FuzzyKnights.Common.Message.MessageManager = new this.FuzzyKnights.Common.Message.MessageManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddTickManager(this.FuzzyKnights.Common.Message.MessageManager);
		//@ WorldManager
		this.FuzzyKnights.Common.World.WorldManager = new this.FuzzyKnights.Common.World.WorldManager(this.FuzzyKnights);
		this.FuzzyKnights.Common.Game.GameManager.AddTickManager(this.FuzzyKnights.Common.World.WorldManager);
		

		//@ PlayerHandler
		this.FuzzyKnights.Common.Event.Handler.PlayerHandler = new this.FuzzyKnights.Common.Event.Handler.PlayerHandler(this.FuzzyKnights);
		//@ InputHandler
		this.FuzzyKnights.Common.Event.Handler.InputHandler = new this.FuzzyKnights.Common.Event.Handler.InputHandler(this.FuzzyKnights);
		//@ EntityHandler
		this.FuzzyKnights.Common.Event.Handler.EntityHandler = new this.FuzzyKnights.Common.Event.Handler.EntityHandler(this.FuzzyKnights);

		
		//@ KeyListener
		this.FuzzyKnights.Common.Event.Listener.KeyListener = new this.FuzzyKnights.Common.Event.Listener.KeyListener(this.FuzzyKnights);
		this.FuzzyKnights.Common.Event.Listener.MouseListener = new this.FuzzyKnights.Common.Event.Listener.MouseListener(this.FuzzyKnights);


		//@ Component Mutators
		this.FuzzyKnights.Common.Component.Mutator.Physics = new this.FuzzyKnights.Common.Component.Mutator.Physics(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Attributes = new this.FuzzyKnights.Common.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Resources = new this.FuzzyKnights.Common.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.States = new this.FuzzyKnights.Common.Component.Mutator.States(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.CreatureInfo = new this.FuzzyKnights.Common.Component.Mutator.CreatureInfo(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.TerrainInfo = new this.FuzzyKnights.Common.Component.Mutator.TerrainInfo(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Worlds = new this.FuzzyKnights.Common.Component.Mutator.Worlds(this.FuzzyKnights);

		this.FuzzyKnights.Client.Network.ConnectionClient = new this.FuzzyKnights.Client.Network.ConnectionClient(this.FuzzyKnights);

		return this;
	}

	//	As of now, used strictly to have something to test on the screen
	BuildEnvironment() {
		let Zone = this.FuzzyKnights.Common.World.ZoneGenerator.RandomAverage(20, 20).GetZone(
			[ 0, 255, this.FuzzyKnights.Common.Entity.Terrain.Grass ]

			// [ 0, 100, this.FuzzyKnights.Common.Entity.Terrain.Water ],
			// [ 100, 125, this.FuzzyKnights.Common.Entity.Terrain.Sand ],
			// [ 125, 255, this.FuzzyKnights.Common.Entity.Terrain.Grass ]
		);
		let Dimension = this.FuzzyKnights.Common.World.Dimension.Generate(null, [
			Zone
		]);
		this.FuzzyKnights.Common.World.WorldManager.AddDimension(Dimension);

		let Player = new this.FuzzyKnights.Common.Game.Player("Mr. Fuzzums", new this.FuzzyKnights.Common.Entity.Creature.Raccoon());
		this.FuzzyKnights.Common.Game.GameManager.SetPlayer(Player);
		this.FuzzyKnights.Common.World.WorldManager.AddPlayer(Player);

		this.FuzzyKnights.Common.Component.Mutator.Worlds.SetZone(Player.Entity, Zone);
		this.FuzzyKnights.Common.Component.Mutator.Worlds.SetPoint(Player.Entity, 2, 2);

		let Enemy = new this.FuzzyKnights.Common.Entity.Creature.Beaver();
		this.FuzzyKnights.Common.Component.Mutator.Worlds.SetZone(Enemy, Zone);
		this.FuzzyKnights.Common.Component.Mutator.Worlds.SetPoint(Enemy, 3, 3);

		//! This doesn't presently render (when it has decimals)
		// this.FuzzyKnights.Common.Component.Mutator.Worlds.SetPoint(Enemy, 3.1, 3.1);

		return this;
	}

	/**
	 * Allow for injections of the FuzzyKnights object into the prototypes for static access of the runtime version
	 */
	PostInit() {
		//@ Apply FuzzyKnight Hooks
		this.FuzzyKnights.Common.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Client.Render.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Client.Render.Drawing.Canvas.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Client.Render.Drawing.Cinematograph.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Client.Render.Drawing.ViewPort.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Event.Event.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Message.Message.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.World.Zone.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Game.Player.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Physics.D2.CollisionMask.FuzzyKnights = this.FuzzyKnights;

		//DEBUG
		this.FuzzyKnights.Common.World.ZoneGenerator.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Utility.Drawing.Canvas.FuzzyKnights = this.FuzzyKnights;

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

export default FKGE;