const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const expressWS = require("express-ws")(express());
const app = expressWS.app;

const PORT = 1337;
const STDIN = process.openStdin();

import * as util from "util";
import FuzzyKnightsCommon from "./public/common/FuzzyKnightsCommon";
import { PlayerConnectMessage } from "./public/common/message/PlayerConnectMessage";
import TestCase from "./TestCase";
const FuzzyKnights = (new FuzzyKnightsCommon({
	IsServer: true,
	Server: {
		Main: app,
		WebSocket: expressWS.getWss()
	}
})).GetFuzzyKnights();
FuzzyKnights.Server.UUID = FuzzyKnights.Common.Utility.Functions.NewUUID();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(path.join(__dirname, "public")));


//TODO Build "Debug Logger" class that, by a CONFIG FS file, will or will not send parameter input into "console.log"
//TODO	DebugLogger.Cout(`[CLIENT CONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
//TODO	DebugLogger.HandlerReceive(this.constructor.name as name, msg) ===> `[MESSAGE RECEIVED - ${name}]: ${msg.MessageType}`;
const DebugLogger = {
	IsDebugMode: true,
	Log: (...input) => DebugLogger.IsDebugMode ? console.log(...input) : null
}

app.ws("/ws", function (client, req) {
	DebugLogger.Log(`[CLIENT CONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
	client.UUID = FuzzyKnights.Common.Utility.Functions.NewUUID();
	FuzzyKnights.Common.Event.Spawn.PlayerConnectEvent(client.UUID);

	client.on("message", function(msg) {
		try {
			const packet = JSON.parse(msg);

			//!	Debugging
			// console.log(client._socket.address());
			// console.log(client.clients);
			DebugLogger.Log(`[PACKET RECEIVED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);

			if(packet["Message"] !== null && packet["Message"] !== void 0) {
				FuzzyKnights.Common.Message.Packet.PacketManager.ExtractMessage(packet);
			}
		} catch (e) {
			DebugLogger.Log("[PACKET FAILURE]: Message could not be extracted");
			DebugLogger.Log(e);
		}
	});

	client.on("close", function() {
		DebugLogger.Log(`[CLIENT DISCONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
		FuzzyKnights.Common.Event.Spawn.PlayerDisconnectEvent(client.UUID);
	});
});

app.listen(PORT, () => {
	console.log(`FuzzyKnights API is now listening on port: ${PORT}`);
});

//?		Replace the contents of this function, as necessary
function RunTestCase(iterations = 1, ...args) {
	for(let i = 0; i < iterations; i++) {
		TestCase(FuzzyKnights, ...args);
	}
}

//?		get Object.keys($.Common.Entity.EntityManager.Entities)
STDIN.addListener("data", function(d) {
	let args = d.toString().trim().replace(/^\s+|\s+$/g, '').split(" ");
	if(args[0] === "get") {
		if(args[1] !== null && args[1] !== void 0) {
			try {
				let obj = args[1].replace("$", "FuzzyKnights");
				console.log(util.inspect(eval(obj)));
			} catch (e) {
				console.log("[WARNING]: Invalid command.");
			}
		}
	} else if(args[0] === "ticks") {
		console.log(JSON.stringify(FuzzyKnights.Common.Game.GameLoop.GetInfo(), null, 2));
	} else if(args[0] === "clients") {
		console.log(clients.map((v, i) => v.UUID));
	} else if(args[0] === "exit" || args[0] === "stop") {
		//  Kill the current Node instance
		process.exit();
	} else if(args[0] === "t" || args[0] === "test") {
		let vars = args.length > 1 ? args.slice(2) : [];
		RunTestCase(args[1] ? args[1] : 1, ...vars);
	} else if(args[0] === "eval") {
		if(args.length > 1) {
			let input = args.slice(1).join(" ");
			try {
				let result = eval(input);
	
				if(result !== void 0) {
					console.log(result);
				}
			} catch (e) {
				console.log("[WARNING]: Invalid command.");
			}
		}
	}
	// console.log(`[PREVIOUS COMMAND]: ${args.join(" ")}`);
});