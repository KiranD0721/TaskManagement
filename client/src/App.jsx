// Import necessary stylesheets and components
import './App.css'; // Custom styles
import './styles/main.scss'; // Main styles
import Header from './components/header/Header'; // Header component
import Signup from './components/registeration/Signup'; // Signup component
import Signin from './components/registeration/Signin'; // Signin component
import Home from './pages/home/Home'; // Home page component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Router components
import TaskManagement from './pages/taskmanagement/TaskManagement'; // TaskManagement component
import Dashboard from './pages/dashboard/Dashboard'; // Dashboard component

function App() {
  return (
    <div>
      {/* Initialize the Router */}
      <Router>
        {/* Include the Header component */}
        <Header />

        {/* Define routes using Routes component */}
        <Routes>
          {/* Define the route for the home page */}
          <Route path='/' element={<Home />} />

          {/* Define the route for the signup page */}
          <Route path='/signup' element={<Signup />} />

          {/* Define the route for the signin page */}
          <Route path='/signin' element={<Signin />} />

          {/* Define the route for the task management page */}
          <Route path='/taskmanager' element={<TaskManagement />} />

          {/* Define the route for the dashboard page */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component as the default export
export default App;
