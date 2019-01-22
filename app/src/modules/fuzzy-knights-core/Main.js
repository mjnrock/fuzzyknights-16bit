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
		// console.log(this.FuzzyKnights);
		// console.log(Module);

		this.Merge(Module);
		console.log(this.FuzzyKnights);
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
		console.log(mod);
		let recurse = (obj, parent = null) => {
			let ret = {};
	
			// This iterates over EVERY object and function in @mod
			// @parent currently provides the correct pathing, it just needs to be meaningfully utilized and string split (e.g. "Common.Entity.Terrain")
			for(let k in obj) {
				if(typeof obj[k] == "object" && obj[k] !== null) {
					console.log("-- OBJECT --");
					console.log(k);
					console.log("-- /OBJECT --");
					// console.log(obj[k] || obj[k].prototype.constructor);
					
					let path = parent ? `${ parent }.${ k }` : k;
					recurse(obj[k], path);
				} else {
					console.log("-- PROTO --");
					console.log(parent, obj[k].prototype ? obj[k].prototype.constructor : null);
					console.log("-- /PROTO --");
				}
			}
	
			return ret;
		};

		console.log(111111);
		console.log(recurse(mod));
		console.log(111111);
		// return recurse(mod);
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