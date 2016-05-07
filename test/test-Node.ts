"use strict";
import Promise from "ts-promise";
import { Stream } from "../lib/index";
import { pipeFromNodeStream } from "../lib/node";
import {expect} from "chai";
import "source-map-support/register";
import * as through2 from "through2";

class TestObject {
	public i: number;
	constructor(i: number) {
		this.i = i;
	}
}

describe("Node", () => {
	describe("pipeFromNodeStream()", () => {
		it("writes objects through to the typed stream", () => {
			let objectStream: any = through2.obj();
			let downStream = new Stream<TestObject>();
			pipeFromNodeStream(objectStream, downStream);
			objectStream.write(new TestObject(42));
			return new Promise<boolean>((resolve, reject) => {
				downStream.forEach((ob) => {
					expect(ob.i).to.eq(42);
					resolve(true);
				});
			});
		});
	});
});
