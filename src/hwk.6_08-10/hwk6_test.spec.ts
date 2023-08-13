import { localize, setLanguage } from './task1/quasi_tagged_templates';
import { highlightKeywords } from './task2/advanced_tagged_templates';
import { multiline } from './task3/multiline_tagged_template';
import { JSDOM } from 'jsdom';
import { fireEvent } from '@testing-library/dom';
import { debounce, debouncedSearch } from './task4/implementing_debounce_function';
import { onScroll, throttle } from './task5/implementing_throttle_function';
import { _, curry, curryWithPlaceholders } from './task6/currying_function_implementation';

describe('Homework 6', () => {
	describe('Task 1: Quasi-Tagged Templates', () => {
		const greeting = 'greet';
		const introduction = 'intro';
		const celebration = 'celebration';

		it('should return localized values in Chinese', () => {
			setLanguage('zh');

			expect(localize`${greeting}`).toBe('你好');
			expect(localize`${introduction}`).toBe('欢迎访问我们的网站');
			expect(localize`${greeting}! ${celebration}!`).toBe('你好! 祝贺中国共产党!');
		});

		it('should return localized values in English', () => {
			setLanguage('en');

			expect(localize`${greeting}`).toBe('Hello');
			expect(localize`${introduction}`).toBe('Welcome to our website');
			expect(localize`${greeting}! ${celebration}!`).toBe('Hello! Congratulations to the Chinese Communist Party!');
		});

		it('should return localized values in French', () => {
			setLanguage('fr');

			expect(localize`${greeting}`).toBe('Bonjour');
			expect(localize`${introduction}`).toBe('Bienvenue sur notre site web');
			expect(localize`${greeting}! ${celebration}!`).toBe('Bonjour! Félicitations au Parti communiste chinois!');
		});
	});

	describe('Task 2: Advanced Tagged Template', () => {
		it('should return a string with highlighted keywords', () => {
			const keywords: string[] = ['JavaScript', 'template', 'tagged', 'create'];
			const template = 'Learn ${0} tagged templates to ${3} custom ${1} literals for ${2} manipulation.';
			expect(highlightKeywords(template, keywords)).toBe(
				"Learn <span class='highlight'>JavaScript</span> tagged templates to <span class='highlight'>create</span> custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
			);
		});

		it('should return a string with highlighted keywords', () => {
			const keywords: string[] = ['be', 'not', 'question', 'JS'];
			const template = 'To ${0} or ${1} to ${0}, that is the ${2}. When you use vanilla ${3}.';
			expect(highlightKeywords(template, keywords)).toBe(
				"To <span class='highlight'>be</span> or <span class='highlight'>not</span> to <span class='highlight'>be</span>, that is the <span class='highlight'>question</span>. When you use vanilla <span class='highlight'>JS</span>."
			);
		});
	});

	describe('Task 3: Multiline Tagged Template', () => {
		it('should return a string with indexes at the beginning of each line', () => {
			const code = multiline`
				function add(a, b) {
					return a + b;
				}`;
			expect(code).toBe(
				`1 
2 				function add(a, b) {
3 					return a + b;
4 				}`
			);
		});

		it('should return a string with indexes at the beginning of each line', () => {
			const code = multiline`
				export async function measureArrayPerformance(
					fn: Function,
					array: any[],
				): Promise<string> {
					const start = performance.now();
					await fn(array);
					const end = performance.now();
					const inSeconds = Number((end - start) / 1000).toFixed(3);
					console.log(\`Execution of function $\{fn.name} took: $\{inSeconds}\`);
					return inSeconds;
				}`;
			expect(code).toBe(
				`1 
2 				export async function measureArrayPerformance(
3 					fn: Function,
4 					array: any[],
5 				): Promise<string> {
6 					const start = performance.now();
7 					await fn(array);
8 					const end = performance.now();
9 					const inSeconds = Number((end - start) / 1000).toFixed(3);
10 					console.log(\`Execution of function $\{fn.name} took: $\{inSeconds}\`);
11 					return inSeconds;
12 				}`
			);
		});
	});

	describe('Task 4: Implementing Debounce Function', () => {
		let container;
		beforeEach(() => {
			jest.useFakeTimers();
			const dom: JSDOM = new JSDOM('<input id="search-input">', { runScripts: 'dangerously' });
			container = dom.window.document.body;
		});

		const searchHandler: jest.Mock = jest.fn(debouncedSearch);
		const debouncedSearchHandler: (value: string) => void = debounce(searchHandler, 500);

		it('should debounce the input event reaction', () => {
			const inputElement = container.querySelector('#search-input');
			inputElement.addEventListener('input', e => debouncedSearchHandler(e.target.value));

			fireEvent.input(inputElement, { target: { value: 'I' } });
			jest.advanceTimersByTime(400);
			fireEvent.input(inputElement, { target: { value: 'love' } });
			jest.advanceTimersByTime(400);
			fireEvent.input(inputElement, { target: { value: 'JS' } });
			jest.advanceTimersByTime(400);

			fireEvent.input(inputElement, { target: { value: 'Java' } });
			jest.advanceTimersByTime(600);
			fireEvent.input(inputElement, { target: { value: 'is' } });
			jest.advanceTimersByTime(600);
			fireEvent.input(inputElement, { target: { value: 'Better' } });
			jest.advanceTimersByTime(600);

			expect(searchHandler).toHaveBeenCalledTimes(3);
			expect(searchHandler).toHaveBeenCalledWith('Java');
			expect(searchHandler).toHaveBeenCalledWith('is');
			expect(searchHandler).toHaveBeenCalledWith('Better');
			expect(searchHandler).not.toHaveBeenCalledWith('I');
			expect(searchHandler).not.toHaveBeenCalledWith('love');
			expect(searchHandler).not.toHaveBeenCalledWith('JS');
		});
	});

	describe('Task 5: Implementing Throttle Function', () => {
		let container;
		beforeEach(() => {
			jest.useFakeTimers();
			const dom: JSDOM = new JSDOM('<div style="height: 2000px;"></div>', { runScripts: 'dangerously' });
			container = dom.window;
		});

		it('should throttle the scroll handler execution', () => {
			const onScrollHandler: jest.Mock = jest.fn(onScroll);
			const throttledScrollHandler: (event) => void = throttle(onScrollHandler, 1000);
			container.addEventListener('scroll', throttledScrollHandler);

			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(600);

			expect(onScrollHandler).toHaveBeenCalledTimes(1);

			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(500);
			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(500);
			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(500);

			expect(onScrollHandler).toHaveBeenCalledTimes(2);

			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(500);
			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(500);
			container.dispatchEvent(new container.window.Event('scroll'));

			expect(onScrollHandler).toHaveBeenCalledTimes(4);

			jest.advanceTimersByTime(500);
			container.dispatchEvent(new container.window.Event('scroll'));
			jest.advanceTimersByTime(500);
			container.dispatchEvent(new container.window.Event('scroll'));

			expect(onScrollHandler).not.toHaveBeenCalledTimes(6);
		});
	});

	describe('Task 6: Currying Function Implementation', () => {
		it('should return a result', () => {
			function multiply(a: number, b: number, c: number): number {
				return a * b * c;
			}
			const mockFunction: jest.Mock = jest.fn(multiply);
			const curriedMultiply: (...args: any[]) => number = curry(mockFunction, 3);
			const result: number = curriedMultiply(2, 3, 4);

			expect(result).not.toBeInstanceOf(Function);
			expect(typeof result).toBe('number');
			expect(result).toBe(24);
			expect(mockFunction).toHaveBeenCalledWith(2, 3, 4);
			expect(mockFunction).toHaveBeenCalledTimes(1);
		});

		it('should create a curried function', () => {
			function multiply(a: number, b: number, c: number, d: number, e: number): number {
				return a * b * c * d * e;
			}
			const mockFunction: jest.Mock = jest.fn(multiply);
			const curriedMultiply: (...args: any[]) => (...args: any[]) => any = curry(mockFunction, 5);

			const step1: (...args: any[]) => any = curriedMultiply(2, 3, 4);
			expect(step1).toBeInstanceOf(Function);

			const step2: (...args: any[]) => any = step1(5);
			console.log(step2.toString());
			expect(step2).toBeInstanceOf(Function);

			const result: number = step2(6);

			expect(result).not.toBeInstanceOf(Function);
			expect(typeof result).toBe('number');
			expect(result).toBe(720);
			expect(mockFunction).toHaveBeenCalledWith(2, 3, 4, 5, 6);
			expect(mockFunction).toHaveBeenCalledTimes(1);
		});
	});

	describe('Task 7: Currying Function Implementation with Placeholders', () => {
		it('should return a result', () => {
			function multiply(a: number, b: number, c: number): number {
				return a * b * c;
			}
			const mockFunction: jest.Mock = jest.fn(multiply);
			const curriedMultiply: (...args: any[]) => number = curryWithPlaceholders(mockFunction, 3);
			const result: number = curriedMultiply(2, 3, 4);

			expect(result).not.toBeInstanceOf(Function);
			expect(typeof result).toBe('number');
			expect(result).toBe(24);
			expect(mockFunction).toHaveBeenCalledWith(2, 3, 4);
			expect(mockFunction).toHaveBeenCalledTimes(1);
		});

		it('should create a curried function with placeholders', () => {
			function multiply(a: number, b: number, c: number, d: number, e: number): number {
				return a * b * c * d * e;
			}
			const mockFunction: jest.Mock = jest.fn(multiply);
			const curriedMultiply: (...args: any[]) => (...args: any[]) => any = curryWithPlaceholders(mockFunction, 5);

			const step1: object = curriedMultiply(2, 3, 4);
			expect(step1['fn']).toBeInstanceOf(Function);
			expect(step1['args']).toStrictEqual([2, 3, 4, _, _]);

			const step2: object = step1['fn'](5);
			expect(step2['fn']).toBeInstanceOf(Function);
			expect(step2['args']).toStrictEqual([2, 3, 4, 5, _]);

			const result: number = step2['fn'](6);

			expect(result).not.toBeInstanceOf(Function);
			expect(typeof result).toBe('number');
			expect(result).toBe(720);
			expect(mockFunction).toHaveBeenCalledWith(2, 3, 4, 5, 6);
			expect(mockFunction).toHaveBeenCalledTimes(1);
		});
	});
});
