class GameLoop {
	constructor(ticksPerSecond = 30) {
		this.TicksPerSecond = ticksPerSecond;
		this.TickHook = null;
		this.RenderHook = null;

		this.Ticks = 0;
		this.LastTime = 0;

		this.IsPaused = false;
		this.Ticker = null;
		this.Timestamp = Date.now();
	}

	GetInfo() {
		return {
			TicksPerSecond: this.TicksPerSecond,
			Ticks: this.Ticks,
			LastTime: this.LastTime,
			IsPaused: this.IsPaused,
			Timestamp:this.Timestamp
		};
	}

	SetTickHook(callback) {
		this.TickHook = callback;

		return this;
	}
	SetRenderHook(callback) {
		this.RenderHook = callback;

		return this;
	}

	IsRunning() {
		return (!this.IsPaused) && (this.Ticker !== null && this.Ticker !== void 0);
	}
	Run() {
		//DEBUG
		// console.log("[Starting] Game Loop...");

		this.Ticker = setInterval(
			() => {
				if(!this.IsPaused) {
					this.Tick(Date.now());
				}
			},
			1000 / this.TicksPerSecond
		);
		requestAnimationFrame(this.Render.bind(this));

		//DEBUG
		// console.log("[Started] Game Loop...");
	}
	Stop() {
		//DEBUG
		// console.log("[Stopping] Game Loop...");

		clearInterval(this.Ticker);
		
		//DEBUG
		// console.log("[Stopped] Game Loop...");
	}
	
	Pause() {
		//DEBUG
		// console.log("[Pausing] Game Loop...");

		this.IsPaused = true;
	}	
	Play() {
		//DEBUG
		// console.log("[Playing] Game Loop...");

		this.IsPaused = false;
	}

	Tick(time) {
		// console.time("Tick");
		
		++this.Ticks;

		let ms = time - this.LastTime;
		this.LastTime = time;

		this.TickHook(ms / 1000);

		// console.timeEnd("Tick");
	}
	Render(time) {
		time = (+Date.now() - this.LastTime) / 1000;
		this.RenderHook(time);

		requestAnimationFrame(this.Render.bind(this));
	}
}

export default new GameLoop();
export { GameLoop };