import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home'
import {QueryClient , QueryClientProvider} from 'react-query'
import Grade from "./components/grade/Grade";
import StudentList from "./pages/studentlist/StudentList";
import { TheContextProvider } from "./context/context";
import Campus from "./pages/campus/Campus";
import CampusInfo from "./components/campus/campusInfo/CampusInfo";
// import axios from "axios";
function App() {
  const queryClient = new QueryClient()
  
  return (
    <Router >
      <Topbar />
      <div className='bodyContainer'>
        <Sidebar />
        <QueryClientProvider client={queryClient}>
          <TheContextProvider>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Grade/>} path="/grade/:gradeId" />
              <Route element={<CampusInfo/>} path="/managecampus/:campusId" />
              <Route element={<StudentList />} path="/studentlist" />
              <Route element={<Campus />} path="/managecampus" />
            </Routes>
          </TheContextProvider>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;
