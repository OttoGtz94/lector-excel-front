import {
	faCircleUser,
	faFileExcel,
} from '@fortawesome/free-regular-svg-icons';
import {
	faArrowRightFromBracket,
	faGear,
	faTable,
	faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
	const { auth, setAuth } = useAuth();

	const navigate = useNavigate();

	const onClickLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('auth');

		setAuth({
			id: '',
			name: '',
			firstName: '',
			userName: '',
		});
		navigate('/');
	};
	return (
		<div className='topBar'>
			<h2>
				<span className='icon'>
					<FontAwesomeIcon icon={faFileExcel} />{' '}
				</span>
				Lector Excel
			</h2>
			<h5 className='user-info'>
				<FontAwesomeIcon icon={faCircleUser} />{' '}
				{auth.name} (<span>{auth.userName}</span>){' '}
			</h5>
			<div className='botonera'>
				<Link to={''} className='icon'>
					{' '}
					<FontAwesomeIcon icon={faUpload} />
				</Link>
				<Link to={'show-excel'} className='icon'>
					<FontAwesomeIcon icon={faTable} />
				</Link>
				<Link to={'ver-registros'} className='icon'>
					{' '}
					<FontAwesomeIcon icon={faDatabase} />
				</Link>
				<p className='icon iconSeparator'>|</p>
				<Link to={'configuracion'} className='icon'>
					<FontAwesomeIcon icon={faGear} />
				</Link>
				<p className='icon iconSeparator'>|</p>
				<p onClick={onClickLogout} className='icon'>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
					/>
				</p>
			</div>
		</div>
	);
};

export default TopBar;
