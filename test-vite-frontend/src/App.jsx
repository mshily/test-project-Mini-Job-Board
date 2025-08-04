import './App.css'
import { JobList } from './components/Jobs/JobList.jsx';
import {Navigate, Route, Routes} from "react-router-dom";
import {JobDetail} from "./components/Jobs/JobDetail.jsx";
import {AdminLogin} from "./components/Admin/AdminLogin.jsx";
import {AdminAdd} from "./components/Admin/AdminAdd.jsx";
import {AdminRemove} from "./components/Admin/AdminRemove.jsx";

function RequireAuth({ children }) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    return isAdmin ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
    return (
        <Routes>
            <Route path="/react/" element={ <Navigate to="/react/list" replace /> } />
            <Route path="/react/list" element={ <JobList /> } />
            <Route path="/react/list/:id" element={ <JobDetail /> } />


            <Route path="/react/admin/login" element={<AdminLogin />} />
            <Route
                path="/react/admin/add"
                element={
                    <RequireAuth>
                        <AdminAdd />
                    </RequireAuth>
                }
            />
            <Route
                path="/react/admin/remove"
                element={
                    <RequireAuth>
                        <AdminRemove />
                    </RequireAuth>
                }
            />


            {/*404 error*/}
            <Route path="*" element={ <p>Page not found</p> } />
        </Routes>
    );
}