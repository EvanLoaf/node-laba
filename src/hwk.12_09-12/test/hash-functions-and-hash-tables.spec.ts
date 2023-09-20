import { HashTable } from '../task/hash-table.model';

describe('Hash Table testing', () => {
	it('should insert and retrieve k-v pairs', () => {
		const hashTable: HashTable = new HashTable(10);
		hashTable.insert('key', 'value');
		hashTable.insert('luckyNumber', 13);
		hashTable.insert('city', 'Dalian');
		hashTable.insert('cuisine', 'Chinese');

		expect(hashTable.get('key')).toBe('value');
		expect(hashTable.get('luckyNumber')).toBe(13);
		expect(hashTable.get('city')).toBe('Dalian');
		expect(hashTable.get('cuisine')).toBe('Chinese');
	});

	it('should delete k-v pairs', () => {
		const hashTable: HashTable = new HashTable(10);
		hashTable.insert('key', 'value');

		expect(hashTable.get('key')).toBe('value');

		hashTable.delete('key');

		expect(hashTable.get('key')).toBe(null);
	});

	it('should handle collisions when working with k-v pairs', () => {
		const hashTable: HashTable = new HashTable(1);
		hashTable.insert('java', 'spring');
		hashTable.insert('typescript', 'nestjs');
		hashTable.insert('python', 'flask');
		hashTable.insert('css', 'hell');

		expect(hashTable.get('java')).toBe('spring');
		expect(hashTable.get('typescript')).toBe('nestjs');
		expect(hashTable.get('python')).toBe('flask');
		expect(hashTable.get('css')).toBe('hell');

		hashTable.delete('python');

		expect(hashTable.get('python')).toBe(null);

		hashTable.delete('java');

		expect(hashTable.get('java')).toBe(null);
		expect(hashTable.get('typescript')).toBe('nestjs');
		expect(hashTable.get('css')).toBe('hell');

		hashTable.insert('c#', '.net');

		expect(hashTable.get('c#')).toBe('.net');
	});

	it('should iterate over k-v pairs', () => {
		const hashTable: HashTable = new HashTable(2);
		hashTable.insert('1', '2');
		hashTable.insert('3', '4');
		hashTable.insert('5', '6');
		hashTable.insert('7', '8');
		hashTable.insert('9', '0');

		hashTable.iterate((k: string, v: any) => {
			console.log(`Iterating over: key – ${k}, value – ${v}`);
		});
	});
});
