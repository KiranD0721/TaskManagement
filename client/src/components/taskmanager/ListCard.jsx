// Disable eslint prop-types rule for this component
/* eslint-disable react/prop-types */

// Import necessary stylesheets and icons
import './listcard.scss'; // Styles for the ListCard component
import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi'; // Icons for arrows and trash
import { arrowClick, deleteItem } from '../../redux/taskSlice'; // Import actions from Redux
import { useDispatch } from 'react-redux'; // Import useDispatch hook for Redux

// Define the ListCard component with 'items' as the props
const ListCard = (items) => {
	// Destructure the 'item' prop from the 'items' object
	const { item } = items;

	// Initialize Redux dispatch
	const dispatch = useDispatch();

	// Handle arrow click to move tasks left or right
	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string));
	};

	// Handle task deletion
	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	return (
		<div>
			{/* Task item with conditional styling */}
			<ul className={` ${item.status === 'done' ? 'completed menu' : 'menu'}`}>
				<li>
					<p>{item._id}</p>
				</li>
				<li>
					<p>{item.task}</p>
				</li>
				<li>
					<p>{item.status}</p>
				</li>
				<li>
					{/* Buttons for task actions */}
					<button
						disabled={item.status === 'backlog'}
						onClick={() => ArrowClick('left')}
					>
						<BiChevronLeft />
					</button>
					<button
						disabled={item.status === 'done'}
						onClick={() => ArrowClick('right')}
					>
						<BiChevronRight />
					</button>
					<button onClick={handleDelete}>
						<BiTrash />
					</button>
				</li>
			</ul>
		</div>
	);
};

// Export the ListCard component as the default export
export default ListCard;
