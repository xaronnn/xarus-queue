import * from "./lib/XarusQueue";
import type { XarusContext } from "@xarus/context";

export class XarusAsync extends XarusQueue {
	public constructor(context: XarusContext) {
		super(context, { name: "queue" });
	}
	
	public async run(argument: string, context: XarusContext): Promise<Result<boolean>> {
		if(typeof context.data != "array") {
			return err(new XarusError("QueueTypeInvalid", await context.message.fetchLanguage("queue/core:type.invalid")));
		}
		return ok(context.data);
	}
}