const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log(import.meta.env.VITE_API_URL)

export async function fetchJobs() {
    const res = await fetch(`${API_URL}/jobs`);
    if (!res.ok) throw new Error('Error loading jobs');
    return await res.json();
}

export async function fetchJob(id) {
    const res = await fetch(`${API_URL}/jobs/${id}`);
    if (!res.ok) throw new Error('Error loading job');
    return await res.json();
}
