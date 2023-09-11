/**
 * Usages: Relations Modeling, Recommendation Systems, Networking, Navigation, Social Networks Connections
 */
// P1.4, P2.3
export class Graph<T> {
	private vertices: Map<T, Set<T>>;

	constructor() {
		this.vertices = new Map<T, Set<T>>();
	}

	// Add a new vertex to the graph
	public addVertex(vertex: T): void {
		if (!this.vertices.has(vertex)) {
			this.vertices.set(vertex, new Set<T>());
		}
	}

	// Add an edge between two vertices
	public addEdge(from: T, to: T): void {
		const fromVertex: Set<T> = this.vertices.get(from);
		const toVertex: Set<T> = this.vertices.get(to);
		if (fromVertex && toVertex) {
			// if both vertexes exist, the edge is added
			fromVertex.add(to);
			toVertex.add(from); // For an undirected graph
		}
	}

	// Perform a depth-first search starting from a specific vertex
	public depthFirstSearch(startVertex: T, callback: (vertex: T) => void): void {
		const visited: Set<T> = new Set();
		const dfs = (vertex: T) => {
			visited.add(vertex);
			callback(vertex);
			const neighbors: Set<T> = this.vertices.get(vertex);
			if (neighbors) {
				for (const neighbor of neighbors) {
					if (!visited.has(neighbor)) {
						dfs(neighbor);
					}
				}
			}
		};
		dfs(startVertex);
	}

	// Perform a breadth-first search (BFS) starting from a specific vertex
	public breadthFirstSearch(startVertex: T, callback: (vertex: T) => void): void {
		const visited: Set<T> = new Set();
		const queue: T[] = [];
		visited.add(startVertex);
		queue.push(startVertex);
		while (queue.length > 0) {
			const vertex: T = queue.shift() as T;
			callback(vertex);
			const neighbors: Set<T> = this.vertices.get(vertex);
			if (neighbors) {
				for (const neighbor of neighbors) {
					if (!visited.has(neighbor)) {
						visited.add(neighbor);
						queue.push(neighbor);
					}
				}
			}
		}
	}

	/**
	 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges
	 */
	// P2.3 Breadth-First Search Shortest Path Problem
	public bfsSPP(start: T, end: T): number | undefined {
		const queue: [T, number][] = [[start, 0]];
		const visited: Set<T> = new Set();
		while (queue.length > 0) {
			const [current, distance] = queue.shift();
			if (current === end) {
				return distance;
			}
			visited.add(current);
			const neighbors: Set<T> = this.vertices.get(current);
			if (!neighbors) continue;
			for (const neighbor of neighbors) {
				if (!visited.has(neighbor)) {
					queue.push([neighbor, distance + 1]);
				}
			}
		}
		return undefined; // No path found
	}
}
