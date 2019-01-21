class ModLoader {
	static Install(fkge) {
		for(let i in fkge.Mods) {
			let mod = new fkge.Mods[i](fkge.FuzzyKnights);

			fkge.FuzzyKnights = mod.GetFuzzyKnights();
		}

		return fkge;
	}
}

export default ModLoader;