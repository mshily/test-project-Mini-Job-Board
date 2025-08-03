// JobCard.jsx
export function JobCard({ job, onTagClick }) {
    return (
        <div className="bg-bg-card p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-1">{job.title}</h2>
            <p className="text-gray-400 mb-3">
                {job.company} — {job.location}
            </p>
            <span
                className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-4 ${
                    job.remote
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white'
                }`}
            >
        {job.remote ? 'Remote' : 'Onsite'}
      </span>
            <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => onTagClick(tag)}
                        className="text-sm bg-gray-700 text-gray-200 px-3 py-1 rounded-full hover:bg-gray-600 transition"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}
