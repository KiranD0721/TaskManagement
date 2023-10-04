// Import necessary stylesheets and libraries
import '../../components/sidebar/sidebar.scss'; // Styles for the Sidebar component
import { useSelector } from 'react-redux'; // Import useSelector hook for accessing Redux state
import { Link } from 'react-router-dom'; // React Router for navigation

// Define the Sidebar component
const Sidebar = () => {
	// Access user authentication data from Redux state
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	return (
		<div>
			{/* Sidebar navigation */}
			<ul className='sidebar'>
				{/* Display the current user's username */}
				<li className='list-item'>
					<h5>{currentUser.username}</h5>
				</li>
				{/* Links to navigate to the Dashboard and Settings */}
				<li className='list-item'>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
				<li className='list-item'>
					<Link to='/settings'>Settings</Link>
				</li>
			</ul>
		</div>
	);
};

// Export the Sidebar component as the default export
export default Sidebar;
