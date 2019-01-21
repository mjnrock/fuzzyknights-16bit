import FKFiles from "./package.js";
import ModLoader from "./../modules/lib/ModLoader.js";

import registry from "../config/entity-render.registry.js"
import settings from "./../config/settings.js"

const FuzzyKnights = FKFiles;
class FKGE {
	constructor(fk = {}, mods = []) {
		this.FuzzyKnights = FuzzyKnights;
		this.Mods = mods;
		this.Window = window;

		ModLoader.Install(this);

		this.Init().PostInit().BuildEnvironment();
		// this.RenderInit().RenderRegistry();

		this.FuzzyKnights.Common.Game.GameLoop.Run();
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

		//@ Component Mutators
		this.FuzzyKnights.Common.Component.Mutator.Physics = new this.FuzzyKnights.Common.Component.Mutator.Physics(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Attributes = new this.FuzzyKnights.Common.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Resources = new this.FuzzyKnights.Common.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.States = new this.FuzzyKnights.Common.Component.Mutator.States(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.CreatureInfo = new this.FuzzyKnights.Common.Component.Mutator.CreatureInfo(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.TerrainInfo = new this.FuzzyKnights.Common.Component.Mutator.TerrainInfo(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Worlds = new this.FuzzyKnights.Common.Component.Mutator.Worlds(this.FuzzyKnights);

		return this;
	}

	/**
	 * Allow for injections of the FuzzyKnights object into the prototypes for static access of the runtime version
	 */
	PostInit() {
		//@ Apply FuzzyKnight Hooks
		this.FuzzyKnights.Common.Entity.Entity.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Event.Event.FuzzyKnights = this.FuzzyKnights;
		this.FuzzyKnights.Common.Game.Player.FuzzyKnights = this.FuzzyKnights;

		// //DEBUG
		// this.FuzzyKnights.Common.World.ZoneGenerator.FuzzyKnights = this.FuzzyKnights;
		// this.FuzzyKnights.Common.Utility.Drawing.Canvas.FuzzyKnights = this.FuzzyKnights;

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