import Module from "./package.js";
// import DeepMerge from "../lib/DeepMerge.js";

//TODO This paradigm works, but should really just be a PoC
//TODO Come up with a completely dynamic way to read and compare properties at every level
	//TODO If present in the Mod, overwrite the Main
class Main {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	PreInit() {
		console.log(this.FuzzyKnights);
		console.log(Module);
		// this.Merge(Module);
	}

	Init() {
		//@ Component Mutators
		this.FuzzyKnights.Common.Component.Mutator.Physics = new Module.Common.Component.Mutator.Physics(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Attributes = new Module.Common.Component.Mutator.Attributes(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Resources = new Module.Common.Component.Mutator.Resources(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.States = new Module.Common.Component.Mutator.States(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.CreatureInfo = new Module.Common.Component.Mutator.CreatureInfo(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.TerrainInfo = new Module.Common.Component.Mutator.TerrainInfo(this.FuzzyKnights);
		this.FuzzyKnights.Common.Component.Mutator.Worlds = new Module.Common.Component.Mutator.Worlds(this.FuzzyKnights);
		
		let Player = new this.FuzzyKnights.Common.Game.Player("Mr. Fuzzums", new Module.Common.Entity.Creature.Raccoon());
		this.FuzzyKnights.Common.Game.GameManager.SetPlayer(Player);
		
		return this.GetFuzzyKnights();
	}
	PostInit() {

	}

	GetFuzzyKnights() {
		return this.FuzzyKnights;
	}
	SetFuzzyKnights(fk) {
		this.FuzzyKnights = fk;

		return this;
	}

	Merge(mod) {
		let fk = this.FuzzyKnights;
		let recurse = (obj) => {
			let ret = {};
	
			for(var k in obj) {
				if(typeof obj[k] == "object" && obj[k] !== null) {
					if(fk[k] === null || fk[k] === void 0) {
						fk[k] = obj[k];
					}
					
					ret[k] = recurse(obj[k]);
				}
			}
	
			return ret;
		};

		return recurse(mod);
	}

	GetNamespaceShape(value) {
		let recurse = (obj) => {
			let ret = {};
	
			for(var k in obj) {
				if(typeof obj[k] == "object" && obj[k] !== null) {
					ret[k] = recurse(obj[k]);
				}
			}
	
			return ret;
		};

		return recurse(value);
	}

	static IsClass(obj) {
		return typeof obj === "function" && obj.hasOwnProperty("prototype") && !obj.hasOwnProperty("arguments");
	}
	static Recurse(obj) {
		let ret = {};

		for(var k in obj) {
			if(typeof obj[k] == "object" && obj[k] !== null) {
				ret[k] = Main.Recurse(obj[k]);
			}
		}

		return ret;
	}
}

export default Main;