export default function(fk){
	let Entity = fk.Entity,
		Render = fk.Render.Entity;

	return [
		[ Entity.Creature.Raccoon, Render.Creature.Raccoon ],
		[ Entity.Creature.Beaver, Render.Creature.Beaver ],
		[ Entity.Terrain.Grass, Render.Terrain.Grass ],
		[ Entity.Terrain.Water, Render.Terrain.Water ],
		[ Entity.Terrain.Sand, Render.Terrain.Sand ]
	];
};