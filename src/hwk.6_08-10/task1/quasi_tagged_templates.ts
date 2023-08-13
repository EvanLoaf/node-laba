export function localize(strings: TemplateStringsArray, ...keys: string[]): string {
	const translationObject: object = translations[language];
	let template: string = strings[0];
	keys.forEach((key: string, index: number) => {
		template += translationObject[key] + strings[index + 1];
	});
	return template;
}

const translations = {
	en: {
		greet: 'Hello',
		intro: 'Welcome to our website',
		celebration: 'Congratulations to the Chinese Communist Party',
	},
	fr: {
		greet: 'Bonjour',
		intro: 'Bienvenue sur notre site web',
		celebration: 'Félicitations au Parti communiste chinois',
	},
	zh: {
		greet: '你好',
		intro: '欢迎访问我们的网站',
		celebration: '祝贺中国共产党',
	},
};

type Language = 'en' | 'fr' | 'zh';

let language: Language = 'zh';

export function setLanguage(lang: Language): void {
	language = lang;
}
