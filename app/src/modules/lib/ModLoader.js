class ModLoader {
	static Install(fkge) {
		for(let i in fkge.Mods) {
			let mod = new fkge.Mods[i](fkge.FuzzyKnights);

			mod.PreInit();
			fkge.FuzzyKnights = mod.Init();
			mod.PostInit();
		}

		return fkge;
	}
}

export default ModLoader;