import React from 'react'

export function SearchBar({ value, onChange, placeholder = 'Search by title…' }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full mb-6 p-2 border rounded"
        />
    )
}
