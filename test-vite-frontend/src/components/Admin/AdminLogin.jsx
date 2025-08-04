import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('isAdmin', 'true')
            navigate('/react/admin/add')
        } else {
            setError('Invalid username or password')
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="p-2 border rounded"
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    )
}
