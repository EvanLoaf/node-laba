export function myJSONParse(jsonString: string): object {
	const tokens: string[] = tokenize(jsonString);
	return parse(tokens);
}

// Splits the input json string into tokens
function tokenize(jsonString: string): string[] {
	const tokens = [];
	let index = 0;

	// Regular expressions for matching JSON elements
	const jsonTokenizationRegex =
		/(\{|\}|\[|\]|"(?:\\.|[^"\\])*"|null\b|true\b|false\b|-?\b\d+(\.\d+)?(?:[eE][+\-]?\d+)?\b|\w+|[^"{}\[\],:\s]+)/g;

	while (index < jsonString.length) {
		// Find the next match in the input string
		const match: RegExpExecArray = jsonTokenizationRegex.exec(jsonString);
		if (!match) {
			// No more matches found
			break;
		}
		// Extract the matched token.
		const token: string = match[0];
		tokens.push(token);
		// Move the index to the end of the matched token
		index = jsonTokenizationRegex.lastIndex;
	}
	return tokens;
}

// Processes tokens and assembles JSON
function parse(tokens: string[]): object {
	const stack: any[] = [];
	let index = 0;

	const nextToken: Function = (): string => tokens[index++];
	const syntaxError: Function = (message: string): void => {
		throw new Error(`Syntax Error: ${message}`);
	};

	while (index < tokens.length) {
		const token: string = nextToken();

		if (token === '{') {
			// Start of an object
			stack.push({});
		} else if (token === '[') {
			// Start of an array
			stack.push([]);
		} else if (token === '}') {
			// End of an object, pop the object from the stack
			const obj = stack.pop();

			// If the stack is not empty and the top is an object, assign this object to its key
			// If the top is an array, push this object into it
			if (stack.length > 0) {
				if (Array.isArray(stack[stack.length - 1])) {
					stack[stack.length - 1].push(obj);
				} else {
					const key: string = stack.pop().replace(/^"|"$/g, '');
					stack[stack.length - 1][key] = obj;
				}
			} else {
				// If the stack is empty or the top is not an object, this is the root object
				return obj;
			}
		} else if (token === ']') {
			// End of an object, pop the object from the stack
			const obj = stack.pop();

			// If the stack is not empty and the top is an object, assign this object to its key
			// If the top is an array, push this object into it
			if (stack.length > 0) {
				if (Array.isArray(stack[stack.length - 1])) {
					stack[stack.length - 1].push(obj);
				} else {
					const key: string = stack.pop().replace(/^"|"$/g, '');
					stack[stack.length - 1][key] = obj;
				}
			} else {
				// If the stack is empty or the top is not an object, this is the root object
				return obj;
			}
		} else {
			let parsedToken: any;
			if (token === 'true') {
				// Revives boolean values
				parsedToken = true;
			} else if (token === 'false') {
				// Revives boolean values
				parsedToken = false;
			} else if (token === 'null') {
				// Revives and handles null values
				parsedToken = null;
			} else if (/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z)$/.test(token)) {
				// Date revival
				parsedToken = new Date(token);
			} else if (/^-?\d+(\.\d+)?([eE][+\-]?\d+)?$/.test(token)) {
				parsedToken = parseFloat(token);
			} else if (typeof token === 'string') {
				parsedToken = token.replace(/^"|"$/g, '');
			} else {
				syntaxError('Unexpected token: ' + token);
			}

			// If the stack is not empty, check its type
			if (stack.length > 0) {
				if (Array.isArray(stack[stack.length - 1])) {
					// If the top of the stack is an array, push the parsed token into it
					stack[stack.length - 1].push(parsedToken);
				} else if (typeof stack[stack.length - 1] === 'object' && stack[stack.length - 1] !== null) {
					// If the top of the stack is an object, wait for a value to assign to this key
					stack.push(parsedToken);
				} else {
					const key: string = stack.pop().replace(/^"|"$/g, '');
					// If the top of the stack is not an object or array, pop the top element [key] and assign current [value]
					// then place it into a preceding object
					stack[stack.length - 1][key] = parsedToken;
				}
			} else {
				// If the stack is empty, this is the root value
				return parsedToken;
			}
		}
	}
}
