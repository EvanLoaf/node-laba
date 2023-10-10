import { myJSONParse } from '../task/json-parse-custom.util';

describe('Homework 13', () => {
	describe('Task: Implementing a Basic JSON Parser with Regular Expressions', () => {
		it('should correctly parse json strings #1', async () => {
			const input = `{
                "id": "647ceaf3657eade56f8224eb",
                "index": 10,
                "negativeIndex": -10,
                "anEmptyArray": [],
                "notEmptyArray": [1, 2, 3,"string", true, null],
                "boolean": true,
                "nullValue": null,
                "nestedObject": {
                    "nestedString": "Hello World",
                    "nestedNumber": 42,
                    "nestedArray": [true, false]
                },
                "complexArray": [
                    {
                        "name": "Alice Alice",
                        "age": 28,
                        "hobbies": ["Reading", "Painting"]
                    },
                    {
                        "name": "Bob Bob",
                        "age": 32,
                        "hobbies": ["Gaming", "Cooking"]
                    }
                ]
            }`;
			const expected = {
				id: '647ceaf3657eade56f8224eb',
				index: 10,
				negativeIndex: -10,
				anEmptyArray: [],
				notEmptyArray: [1, 2, 3, 'string', true, null],
				boolean: true,
				nullValue: null,
				nestedObject: {
					nestedString: 'Hello World',
					nestedNumber: 42,
					nestedArray: [true, false],
				},
				complexArray: [
					{
						name: 'Alice Alice',
						age: 28,
						hobbies: ['Reading', 'Painting'],
					},
					{
						name: 'Bob Bob',
						age: 32,
						hobbies: ['Gaming', 'Cooking'],
					},
				],
			};
			const actual: object = myJSONParse(input);

			expect(actual).toStrictEqual(expected);
		});

		it('should correctly parse json strings #2', async () => {
			const input = `{
              "name": "John",
              "age": 30,
              "isActive": true,
              "languages": ["JavaScript", "Python", "Java"],
              "projects": [
                {
                  "name": "Project A",
                  "startDate": "2023-01-15T14:30:00Z",
                  "endDate": null,
                  "isCompleted": false
                },
                {
                  "name": "Project B",
                  "startDate": "2022-07-10T09:45:00Z",
                  "endDate": "2022-12-20T18:00:00Z",
                  "isCompleted": true
                }
              ]
            }`;
			const expected = {
				name: 'John',
				age: 30,
				isActive: true,
				languages: ['JavaScript', 'Python', 'Java'],
				projects: [
					{
						name: 'Project A',
						startDate: '2023-01-15T14:30:00Z',
						endDate: null,
						isCompleted: false,
					},
					{
						name: 'Project B',
						startDate: '2022-07-10T09:45:00Z',
						endDate: '2022-12-20T18:00:00Z',
						isCompleted: true,
					},
				],
			};
			const actual: object = myJSONParse(input);

			expect(actual).toStrictEqual(expected);
		});

		it('should correctly parse json strings #3', async () => {
			const input = `{
              "baseCurrency": "USD",
              "date": "2023-10-10",
              "currencies": {
                "EUR": {
                  "displayName": "Euro",
                  "exchangeRate": 0.88,
                  "symbol": "€"
                },
                "GBP": {
                  "displayName": "British Pound",
                  "exchangeRate": 0.75,
                  "symbol": "£"
                },
                "JPY": {
                  "displayName": "Japanese Yen",
                  "exchangeRate": 114.20,
                  "symbol": "¥"
                },
                "AUD": {
                  "displayName": "Australian Dollar",
                  "exchangeRate": 1.33,
                  "symbol": "A$"
                },
                "CAD": {
                  "displayName": "Canadian Dollar",
                  "exchangeRate": 1.28,
                  "symbol": "C$"
                }
              }
            }`;
			const expected = {
				baseCurrency: 'USD',
				date: '2023-10-10',
				currencies: {
					EUR: {
						displayName: 'Euro',
						exchangeRate: 0.88,
						symbol: '€',
					},
					GBP: {
						displayName: 'British Pound',
						exchangeRate: 0.75,
						symbol: '£',
					},
					JPY: {
						displayName: 'Japanese Yen',
						exchangeRate: 114.2,
						symbol: '¥',
					},
					AUD: {
						displayName: 'Australian Dollar',
						exchangeRate: 1.33,
						symbol: 'A$',
					},
					CAD: {
						displayName: 'Canadian Dollar',
						exchangeRate: 1.28,
						symbol: 'C$',
					},
				},
			};
			const actual: object = myJSONParse(input);

			expect(actual).toStrictEqual(expected);
		});
	});
});
