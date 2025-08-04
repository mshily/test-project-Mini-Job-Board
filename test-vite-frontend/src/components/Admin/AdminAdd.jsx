import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export function AdminAdd() {
    console.log('All env vars:', import.meta.env)
    console.log('VITE_API_URL specifically:', import.meta.env.VITE_API_URL)
    console.log('Final API_URL being used:', API_URL)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [location, setLocation] = useState('')
    const [remote, setRemote] = useState(false)
    const [tags, setTags] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const payload = {
            title,
            description,
            contact_email: contactEmail,
            location,
            is_remote: remote,
            tags: tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
        }

        try {
            console.log('API URL:', `${API_URL}/jobs`)
            const res = await fetch('http://127.0.0.1:8000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Unknown error' }))
                throw new Error(errorData.message || `Error ${res.status}`)
            }

            setTitle('')
            setDescription('')
            setContactEmail('')
            setLocation('')
            setRemote(false)
            setTags('')

            navigate('/react/list')
        } catch (err) {
            console.error('Error adding job:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add job</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 border rounded h-24"
                    required
                />
                <input
                    type="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="Contact Email"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full p-2 border rounded"
                    required
                />
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={remote}
                        onChange={e => setRemote(e.target.checked)}
                    />
                    Remote
                </label>
                <input
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className=" w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="p-2 bg-green-600 text-white rounded disabled:bg-gray-400"
                >
                    {loading ? 'Adding Job...' : 'Add Job'}
                </button>
            </form>
        </div>
    )
}