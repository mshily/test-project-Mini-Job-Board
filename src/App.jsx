import './App.css'
import { JobList } from './components/JobList.jsx';

export default function App() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Mini Job Board</h1>
            <JobList />
        </div>
    );
}