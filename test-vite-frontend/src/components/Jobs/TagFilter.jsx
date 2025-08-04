import React, { useState } from 'react'

export function TagFilter({ selectedTags, onAddTag, onRemoveTag }) {
    const [tagInput, setTagInput] = useState('')

    const handleKeyDown = e => {
        if (e.key === 'Enter' && tagInput.trim()) {
            onAddTag(tagInput.trim())
            setTagInput('')
        }
    }

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map(tag => (
                    <span
                        key={tag}
                        className="
              flex items-center
              bg-gray-700 text-gray-100
              px-3 py-1
              rounded-full
              shadow-sm
              text-sm
              transition
              hover:bg-gray-600
            "
                    >
            {tag}
                        <button
                            onClick={() => onRemoveTag(tag)}
                            className="
                ml-2
                w-5 h-5
                flex items-center justify-center
                text-gray-300 hover:text-red-900
                transition-colors
              "
                        >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
                ))}
            </div>
            <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag and press Enter"
                className="
          w-full
          p-2
          border border-gray-600
          bg-gray-800 text-gray-100
          rounded
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
            />
        </div>
    )
}
