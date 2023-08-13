export function highlightKeywords(template: string, keywords: string[]): string {
	return template.replace(/\${(\d+)}/g, (match: string, index: string) => {
		const keyword: string = keywords[index];
		return `<span class='highlight'>${keyword}</span>`;
	});
}
