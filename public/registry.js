export default function(fk){
	let Entity = fk.Entity,
		Render = fk.Render.Entity;

	return [
		[ Entity.Creature.Raccoon, Render.Creature.Raccoon ],
		[ Entity.Terrain.Grass, Render.Terrain.Grass ]
	];
};