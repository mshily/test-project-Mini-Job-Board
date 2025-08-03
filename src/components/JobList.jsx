// src/components/JobList.jsx
import React, { useState } from 'react'
import { jobs } from '../data/jobs'
import { JobCard } from './JobCard'

export function JobList() {
    const [query, setQuery] = useState('')
    const [tagInput, setTagInput] = useState('')
    const [selectedTags, setSelectedTags] = useState([])

    // добавить тег из поля ввода
    const handleTagKeyDown = e => {
        if (e.key === 'Enter' && tagInput.trim()) {
            const tag = tagInput.trim()
            if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag])
            }
            setTagInput('')
        }
    }

    const removeTag = tag =>
        setSelectedTags(selectedTags.filter(t => t !== tag))

    const addTag = tag => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const filtered = jobs.filter(job => {
        const q = query.toLowerCase()
        const matchesQuery =
            job.title.toLowerCase().includes(q) ||
            job.tags.some(t => t.toLowerCase().includes(q))

        // пропускаем только те, у которых есть **все** выбранные теги
        const matchesTags = selectedTags.every(tag =>
            job.tags.includes(tag)
        )

        return matchesQuery && matchesTags
    })

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Секция фильтров по тегам */}
            <div className="flex flex-wrap gap-2 mb-4">
                {selectedTags.map(tag => (
                    <span
                        key={tag}
                        className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
            {tag}
                        <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-lg leading-none hover:text-blue-600"
                        >
              &times;
            </button>
          </span>
                ))}
            </div>

            {/* Поле для добавления нового тега */}
            <input
                type="text"
                placeholder="Добавьте тег и нажмите Enter"
                className="w-full mb-4 p-2 border rounded"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
            />

            {/* Обычный поиск по названию/тегу */}
            <input
                type="text"
                placeholder="Ищите по названию или тегу…"
                className="w-full mb-6 p-2 border rounded"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {filtered.length === 0 ? (
                <p className="text-center text-gray-500">
                    Ничего не найдено.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onTagClick={addTag}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
