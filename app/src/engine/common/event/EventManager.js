import { Subject } from "rxjs";

import { NewUUID } from "./../../../engine/common/utility/Functions.js";

class EventManager {
	/**
	 * @eventName = string
	 * @subscription = { next, ?error, ?complete }
	 * [ ["eventName", ?subscription ], ... ]
	 */
	constructor(seed = []) {
		this.Events = {};
		this.Subscriptions = {};

		seed.forEach(e => this.Initialize(e[0], e[1]));
	}

	Initialize(name, observer = null) {
		this.Register(name);

		if(observer) {
			this.Subscribe(name, observer);
		}

		return this;
	}

	Register(name) {
		this.Events[name] = new Subject();

		return this;
	}
	Unregister(name) {
		delete this.Events[name];

		return this;
	}

	Invoke(name, ...args) {
		this.Events[name].next(...args);

		return this;
	}

	Subscribe(name, observer) {
		let uuid = NewUUID();

		this.Subscriptions[uuid] = {
			uuid: uuid,
			name: name,
			subscription: this.Events[name].subscribe(observer)
		};

		return uuid;
	}
	Unsubscribe(uuid) {
		this.Subscriptions[uuid].subscription.unsubscribe();

		return this;
	}
	UnsubscribeAll(name) {
		this.Subscriptions.forEach(s => {
			s.subscription.unsubscribe();
		});

		return this;
	}
}

export default EventManager;