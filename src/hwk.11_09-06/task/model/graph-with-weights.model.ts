// P2.3
export class GraphWithWeights<T> {
	private vertices: Map<T, Map<T, number>>;

	constructor() {
		this.vertices = new Map<T, Map<T, number>>();
	}

	// Add a new vertex to the graph
	public addVertex(vertex: T): void {
		if (!this.vertices.has(vertex)) {
			this.vertices.set(vertex, new Map<T, number>());
		}
	}

	// Add an edge between two vertices
	public addEdge(from: T, to: T, weight: number): void {
		const fromVertex: Map<T, number> = this.vertices.get(from);
		const toVertex: Map<T, number> = this.vertices.get(to);
		if (fromVertex && toVertex) {
			// if both vertexes exist, the edge is added
			fromVertex.set(to, weight);
			toVertex.set(from, weight); // For an undirected graph
		}
	}

	/**
	 * Time Complexity: O(V^2), where V is the number of vertices
	 */
	// Dijkstra Algo with weights Shortest Path Problem
	dijkstraSPP(start: T, end: T): number | undefined {
		const distances: Map<T, number> = new Map();
		const visited: Set<T> = new Set();
		for (const vertex of this.vertices.keys()) {
			distances.set(vertex, Infinity);
		}
		distances.set(start, 0);
		while (true) {
			const current: T = this.getMinDistanceVertex(distances, visited);
			if (!current) break;
			visited.add(current);
			const neighbors: Map<T, number> = this.vertices.get(current);
			if (!neighbors) continue;
			for (const [neighbor, weight] of neighbors) {
				const distance: number = distances.get(current) + weight;
				if (distance < distances.get(neighbor)) {
					distances.set(neighbor, distance);
				}
			}
		}
		return distances.get(end);
	}

	private getMinDistanceVertex(distances: Map<T, number>, visited: Set<T>): T | undefined {
		let minDistance = Infinity;
		let minVertex: T | undefined;
		for (const [vertex, distance] of distances) {
			if (!visited.has(vertex) && distance < minDistance) {
				minDistance = distance;
				minVertex = vertex;
			}
		}
		return minVertex;
	}
}
