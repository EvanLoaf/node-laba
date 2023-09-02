export class AsyncOperationManager {
	simulateAsyncOperation(delay) {
		setTimeout(() => {
			console.log(`Async operation completed after ${delay} ms`);
		}, delay);
	}

	scheduleImmediate() {
		setImmediate(() => {
			console.log('Immediate task executed');
		});
	}

	simulateAsyncOperationWithTick(delay) {
		setTimeout(() => {
			console.log(`Async operation with a tick completed after ${delay} ms`);
			process.nextTick(() => {
				console.log('Microtask executed immediately after a Timer task');
			});
		}, delay);
	}

	scheduleImmediateWithTick() {
		setImmediate(() => {
			console.log('Immediate task with a tick executed');
			process.nextTick(() => {
				console.log('Microtask executed immediately after an Immediate task');
			});
		});
	}
}

const manager = new AsyncOperationManager();

manager.simulateAsyncOperation(200); // I
process.nextTick(() => {
	console.log('Microtask executed immediately'); // B
});
manager.scheduleImmediate(); // F
manager.simulateAsyncOperation(0); // C
manager.scheduleImmediateWithTick(); // G + H
manager.simulateAsyncOperationWithTick(0); // D + E
manager.simulateAsyncOperationWithTick(200); // J + K
console.log('I love looping events'); // A

// Output:
// A I love looping events
// B Microtask executed immediately
// C Async operation completed after 0 ms
// D Async operation with a tick completed after 0 ms
// E Microtask executed immediately after a Timer task
// F Immediate task executed
// G Immediate task with a tick executed
// H Microtask executed immediately after an Immediate task
// I Async operation completed after 200 ms
// J Async operation with a tick completed after 200 ms
// K Microtask executed immediately after a Timer task

// Simplified loop:
// 1 Next Tick
// 2 Timers
// 3 Next Tick
// 4 Check
