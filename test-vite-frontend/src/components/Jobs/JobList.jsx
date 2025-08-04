import React, { useState, useEffect } from 'react'
import { fetchJobs } from '../../api/jobs.js'
import { JobCard } from './JobCard.jsx'
import { SearchBar } from './SearchBar.jsx'
import { TagFilter } from './TagFilter.jsx'
import { Header } from './Header.jsx'

export function JobList() {
    const [jobs, setJobs] = useState([])
    const [query, setQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        fetchJobs().then(data => {
            const normalized = data.map(job => ({
                ...job,
                remote: job.is_remote,
            }))
            setJobs(normalized)
        }).catch(console.error)
    }, [])


    const filteredJobs = jobs.filter(job => {
        const q = query.toLowerCase()
        const matchesQuery =
            job.title.toLowerCase().includes(q) ||
            job.tags.some(t => t.toLowerCase().includes(q)) ||
            (job.is_remote ? 'remote' : 'onsite').includes(q)

        const matchesTags = selectedTags.every(tag => {
            const allTags = [...job.tags, job.is_remote ? 'Remote' : 'Onsite']
            return allTags.includes(tag)
        })

        return matchesQuery && matchesTags
    })

    return (
        <div className="max-w-4xl mx-auto p-4">

            <Header/>

            <TagFilter
                selectedTags={selectedTags}
                onAddTag={tag => setSelectedTags([...selectedTags, tag])}
                onRemoveTag={tag => setSelectedTags(selectedTags.filter(t => t !== tag))}
            />

            <SearchBar
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Find by name or tag…"
            />

            {filteredJobs.length === 0 ? (
                <p className="text-center text-gray-500">Nothing found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} onTagClick={tag => setSelectedTags([...selectedTags, tag])} />
                    ))}
                </div>
            )}
        </div>
    )
}
