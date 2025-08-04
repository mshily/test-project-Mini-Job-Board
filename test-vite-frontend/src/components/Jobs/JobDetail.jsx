import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchJob } from '../../api/jobs.js'

export function JobDetail() {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchJob(id)
            .then(data => setJob(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p>loading…</p>
    if (error) return <p>error: {error.message}</p>
    if (!job) return <p>Nothing found.</p>

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-2">
        <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
                job.is_remote ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}
        >
          {job.is_remote ? 'Remote' : 'Onsite'}
        </span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">{job.location}</span>
            </div>
            <p className="text-gray-400">{job.description}</p>
            <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                    <span
                        key={tag}
                        className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm"
                    >
            {tag}
          </span>
                ))}
            </div>
            <div className="text-sm text-gray-500">
                Contact:&nbsp;
                <a
                    href={`mailto:${job.contact_email}`}
                    className="text-blue-600 hover:underline"
                >
                    {job.contact_email}
                </a>
            </div>
            <Link to="/react/list" className="inline-block text-blue-600 hover:underline">
                ← Back to list
            </Link>
        </div>
    )
}
