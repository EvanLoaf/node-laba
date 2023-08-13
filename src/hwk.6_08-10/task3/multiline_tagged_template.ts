export function multiline(strings: TemplateStringsArray) {
	let result = '';
	const lines: string[] = strings[0].split('\n');
	lines.forEach((line: string, index: number) => {
		result += `${index + 1} ${line}\n`;
	});
	return result.trim();
}
