class ModLoader {
	static Install(fkge) {
		let fk = fkge.FuzzyKnights,
			mods = fkge.Mods;

		for(let i in mods) {
			fk = new mods[i](fk);
		}

		return fkge;
	}
}

export default ModLoader;