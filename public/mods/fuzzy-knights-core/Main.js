import FuzzyKnightsCore from "./package.js";

//TODO This paradigm works, but should really just be a PoC
//TODO Come up with a completely dynamic way to read and compare properties at every level
	//TODO If present in the Mod, overwrite the Main
class Main {
	constructor(fk) {
		fk.Common.Component.Worlds = FuzzyKnightsCore.Common.Component.Worlds;

		return fk;
	}
}

export default Main;