import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
	return (
		<div>
			<Link to={'/'}>
				<FontAwesomeIcon icon={faDatabase} />{' '}
			</Link>
		</div>
	);
};

export default Sidebar;
