import Module from "./package.js";
import DeepMerge from "../lib/DeepMerge.js";

//TODO This paradigm works, but should really just be a PoC
//TODO Come up with a completely dynamic way to read and compare properties at every level
	//TODO If present in the Mod, overwrite the Main
class Main {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Merge(Module);

		console.log(this.FuzzyKnights);
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