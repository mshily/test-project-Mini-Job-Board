import React, { useState, useEffect } from 'react'
import { fetchJobs } from '../../api/jobs'
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export function AdminRemove() {
    const [jobs, setJobs]     = useState([])
    const [error, setError]   = useState(null)
    const [query, setQuery]   = useState('')
    const token               = localStorage.getItem('token')

    useEffect(() => {
        fetchJobs()
            .then(setJobs)
            .catch(err => setError(err.message))
    }, [])

    const handleDelete = async id => {
        if (!window.confirm('Are you sure you want to delete?')) return
        try {
            const res = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!res.ok) throw new Error('Error ' + res.status)
            setJobs(prev => prev.filter(j => j.id !== id))
        } catch (e) {
            setError(e.message)
        }
    }

    const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Deleting jobs</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}

            <input
                type="text"
                placeholder="Find by title..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring"
            />

            {filtered.length === 0 ? (
                <p className="text-gray-500">Nothing found.</p>
            ) : (
                <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map(job => (
                        <li
                            key={job.id}
                            className={`
                w-full              
                flex flex-col justify-between
                p-6
                border-2 border-gray-600
                rounded-2xl
                bg-gray-800
                transform hover:scale-105
                transition-transform duration-300 ease-in-out
                min-h-[200px]
              `}
                        >
                            <div>
                                <strong className="text-lg text-white">{job.title}</strong><br />
                                <small className="text-gray-400">{job.contact_email}</small>
                            </div>
                            <button
                                onClick={() => handleDelete(job.id)}
                                className="
                                      mt-4
                                      w-full
                                      px-4 py-2
                                      bg-red-600 hover:bg-red-700
                                      text-white font-medium
                                      rounded
                                      transition-colors duration-150
                                    "
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
