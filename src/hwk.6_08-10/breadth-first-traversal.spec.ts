import { deepCopyBFS, deepEqualWithAnyOrder } from '../util/object-functions.util';

describe('Deep copy method for objects using breadth-first tree traversal algo', () => {
	it('Should create a deep clone of a complex object using breadth-first tree traversal algo', () => {
		const sample = {
			name: 'Java',
			platforms: ['Windows', 'Mac', 'Linux', 'Solaris'],
			versions: [8, 11, 17],
			latestVersion: 17,
			frameworks: {
				popular: ['Spring', 'Hibernate', 'Struts'],
				modern: ['Spring Boot', 'Jakarta EE', 'Micronaut'],
			},
			getLatestFramework() {
				return this.frameworks.modern[0];
			},
			books: [
				{
					title: 'Head First Java',
					author: 'Kathy Sierra',
				},
				{
					title: 'Effective Java',
					author: 'Joshua Bloch',
				},
			],
		};
		const clone = deepCopyBFS(sample);
		console.log(clone);
		expect(clone).toEqual(sample);
		expect(deepEqualWithAnyOrder(sample, clone)).toBe(true);
	});
});
