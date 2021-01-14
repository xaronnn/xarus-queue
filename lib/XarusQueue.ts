export class AsyncQueue {
	
	public get remaining(): number {
		return this.promises.length;
	}
	
	private promises: InternalAsyncQueueDeferredPromise[] = [];

	public wait(): Promise<void> {
		const next = this.promises.length ? this.promises[this.promises.length - 1].promise : Promise.resolve();
		// eslint-disable-next-line @typescript-eslint/init-declarations
		let resolve: () => void;
		const promise = new Promise<void>((res) => {
			resolve = res;
		});

		this.promises.push({
			resolve: resolve!,
			promise
		});

		return next;
	}

	public shift(): void {
		const deferred = this.promises.shift();
		if (typeof deferred !== 'undefined') deferred.resolve();
	}
}

interface InternalAsyncQueueDeferredPromise {
	resolve(): void;
	promise: Promise<void>;
}
