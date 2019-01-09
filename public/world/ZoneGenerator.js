import Functions from "../utility/Functions.js";
import Dice from "../utility/Dice.js";

import { Zone } from "./Zone.js";
import ElementMap from "./../utility/ElementMap.js";

//TODO CellularAutomata is complete for T/F, but needs a more meaningful generation paradigm
class CellularAutomata {
	constructor(xmax, ymax) {
		this.XMax = xmax;
		this.YMax = ymax;

		this.BirthRate = 0.45;
		this.BirthThreshold = 5;
		this.DeathThreshold = 3;
		this.Simulations = 7;
		
		// this.Cells = new Grid(xmax, ymax, "number");
		this.Cells = new Grid(xmax, ymax, "boolean");
	}

	Run() {
		this.Cells.ForEach((p, e, g, a) => {
			// g.Set(p.X, p.Y, Math.random() < a[0] ? 255 : 0);
			g.Set(p.X, p.Y, Math.random() < a[0] ? true : false);
		}, [this.BirthRate]);

		for (let i = 0; i < this.Simulations; i++) {
			this.Cells = this.SimulateStep(this.Cells);
		}

		return this;
	}

	SimulateStep(grid0) {
		// let grid1 = new Grid(this.XMax, this.YMax, "number");
		let grid1 = new Grid(this.XMax, this.YMax, "boolean");

		grid0.ForEach((p, e, g, a) => {
			let n = a[0].CountAliveNeighbors(a[1], p.X, p.Y);
			if (!!a[1].Get(p.X, p.Y)) {
				// a[2].Set(p.X, p.Y, !(n < a[0].DeathThreshold) ? 255 : 0);
				a[2].Set(p.X, p.Y, !(n < a[0].DeathThreshold));
			} else {
				// a[2].Set(p.X, p.Y, !!(n > a[0].BirthThreshold) ? 255 : 0);
				a[2].Set(p.X, p.Y, !!(n > a[0].BirthThreshold));
			}
		}, [this, grid0, grid1]);

		return grid1;
	}

	CountAliveNeighbors(grid, x, y) {
		let count = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let nX = x + i,
					nY = y + j;

				count += (nX < 0 || nY < 0 || nX >= this.XMax || nY >= this.YMax || !!grid.Get(nX, nY)) ? 1 : 0;
			}
		}

		return count;
	}
}

class RandomAverage {
	constructor(xmax, ymax) {
		this.XMax = xmax;
		this.YMax = ymax;

		this.CellAverage = 0;
		this.CellMin = 255;
		this.CellMax = 0;

		this.Cells = new ElementMap(xmax, ymax);
	}

	Run() {
		this.Cells.ForEach((pos, ele, em, args) => {
			em.Set(pos.X, pos.Y, Dice.Random(0, 255));
		});

		this.Cells.ForEach((pos, ele, em, args) => {
			// let avg = Functions.Round(a[0].GetNeighbors(p.X, p.Y), 0);
			let avg = Functions.Round(this.GetNeighbors(pos.X, pos.Y), 0);
			this.CellAverage += avg;

			this.CellMin = avg < this.CellMin ? avg : this.CellMin;
			this.CellMax = avg > this.CellMax ? avg : this.CellMax;

			em.Set(pos.X, pos.Y, avg);
		});

		this.CellAverage = Functions.Round(this.CellAverage / this.Cells.Size(), 0);

		return this;
	}

	/**
	 * 
	 * @param array | [ [ min, max, Terrain ], ... ]
	 */
	//TODO Build a default case here (e.g. Void or Water)
	ConvertToTerrain(array = []) {
		if(array.length === 0) {			
			return null;
		}

		let terrainGrid = new ElementMap(this.Cells.XMax, this.Cells.YMax);

		if(array.length === 1) {
			this.Cells.ForEach((pos, ele, t) => {				
				if(ele >= array[0][0] && ele < array[0][1]) {
					terrainGrid.Set(pos.X, pos.Y, new array[0][2]());
				}				
			});

			return terrainGrid;
		}

		for(let i in array) {
			let arr = array[i];

			this.Cells.ForEach((pos, ele, t) => {
				if(ele >= arr[0] && ele < arr[1]) {
					terrainGrid.Set(pos.X, pos.Y, new arr[2]());
				}				
			});
		}

		return terrainGrid;
	}

	GetGrid(run = true) {
		if(run) {
			this.Run();
		}

		return this.Cells;
	}
	GetZone(...terrainRanges) {
		this.Run();
		
		let eleMap = this.ConvertToTerrain([
			...terrainRanges
		]);
		console.log(eleMap);
		return new Zone(eleMap);
	}

	GetNeighbors(x, y) {
		let value = 0,
			count = 0;

		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let nX = x + i,
					nY = y + j;

				if (nX >= 0 && nX < this.XMax && nY >= 0 && nY < this.YMax) {
					value += this.Cells.Get(nX, nY);
					++count;
				}
			}
		}

		return value / count;
	}
}

const ZoneGenerator = {
	RandomAverage() {
		return new RandomAverage(...arguments);
	},
	CellularAutomata() {
		return new CellularAutomata(...arguments);
	}
};

export { ZoneGenerator };