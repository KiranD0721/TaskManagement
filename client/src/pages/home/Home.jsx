// Import necessary stylesheets, components, and React Redux hooks
import './home.scss'; // Styles for the Home component
import { useSelector } from 'react-redux'; // Import useSelector hook for accessing Redux state
import { Link } from 'react-router-dom'; // React Router for navigation

// Define the Home component
const Home = () => {
	// Access user authentication data from Redux state
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	return (
		<div className='home'>
			<div className='home__container'>
				<h1>Welcome to Task Management Application</h1>
				<p>Organize your work, stay productive, and get things done efficiently!</p>

				{/* Conditional rendering of the 'Get Started' button based on user authentication */}
				{currentUser && currentUser.token ? (
					<Link to='/dashboard' className='button'>
						Get Started
					</Link>
				) : (
					<Link to='/signin' className='button'>
						Get Started
					</Link>
				)}
			</div>
		</div>
	);
};

// Export the Home component as the default export
export default Home;
