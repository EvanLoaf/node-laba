# Execution Order Report

## Code

> __I__ manager.simulateAsyncOperation(200);   
__B__ process.nextTick(() => {  
console.log('Microtask executed immediately');   
});  
__F__ manager.scheduleImmediate();   
__C__ manager.simulateAsyncOperation(0);   
__G + H__ manager.scheduleImmediateWithTick();   
__D + E__ manager.simulateAsyncOperationWithTick(0);   
__J + K__ manager.simulateAsyncOperationWithTick(200);   
__A__ console.log('I love looping events');   

## Output

> __A__ I love looping events  
__B__ Microtask executed immediately  
__C__ Async operation completed after 0 ms  
__D__ Async operation with a tick completed after 0 ms  
__E__ Microtask executed immediately after a Timer task  
__F__ Immediate task executed  
__G__ Immediate task with a tick executed  
__H__ Microtask executed immediately after an Immediate task  
__I__ Async operation completed after 200 ms  
__J__ Async operation with a tick completed after 200 ms  
__K__ Microtask executed immediately after a Timer task  

## Assumptions

> __Simplified loop for this case:__  
__1__ Next Tick  
__2__ Timers  
__3__ Next Tick  
__4__ Check  
__5__ Next Tick  

## Simplified Explanation

- No loop started
  - __A__ I love looping events – simple console.log outputs right away  

- Loop Cycle 1 (0ms / immediate execution)
  - __B__ Microtask executed immediately  
  - __C__ Async operation completed after 0 ms  
  - __D__ Async operation with a tick completed after 0 ms  
  - __E__ Microtask executed immediately after a Timer task  
  - __F__ Immediate task executed  
  - __G__ Immediate task with a tick executed  
  - __H__ Microtask executed immediately after an Immediate task
> __1__ Next Tick: [B]  
__2__ Timers: [C, D]  
__3__ Next Tick: [E]  
__4__ Check: [F, G]  
__5__ Next Tick: [H]

- Loop Cycle 2 (200ms)
  - __I__ Async operation completed after 200 ms  
  - __J__ Async operation with a tick completed after 200 ms  
  - __K__ Microtask executed immediately after a Timer task
> __1__ Next Tick: []  
__2__ Timers: [I, J]  
__3__ Next Tick: [K]  
__4__ Check: []  
__5__ Next Tick: []