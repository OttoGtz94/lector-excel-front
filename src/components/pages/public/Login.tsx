import axios from 'axios';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertToastify } from '../../../helpers';

const Login = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		if ([userName, password].includes('')) {
			alertToastify(
				'warn',
				'Nombre de usuario y contraseña son obligatorios',
			);
			return;
		}

		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/users/login`,
				{ userName, password },
			);
			alertToastify('success', data.msg);
			setUserName('');
			setPassword('');

			//const res = decodeToken(data.token);
			//decodedJWT(data.token);
			localStorage.setItem('token', data.token);
			localStorage.setItem('auth', 'true');
			setTimeout(() => {
				navigate('/user');
			}, 500);
		} catch (error: any) {
			alertToastify('error', error.response.data.msg);
		}
	};

	return (
		<>
			{/* <h3>Iniciar Sesión</h3> */}
			<form className='form' onSubmit={handleSubmit}>
				<div className='group'>
					<label htmlFor='userName'>
						Nombre usuario
					</label>
					<input
						type='text'
						id='userName'
						value={userName}
						onChange={e =>
							setUserName(e.target.value)
						}
					/>
				</div>
				<div className='group'>
					<label htmlFor='password'>Contraseña</label>
					<input
						type='password'
						name=''
						id='password'
						value={password}
						onChange={e =>
							setPassword(e.target.value)
						}
					/>
				</div>
				<button type='submit' className='btnLogin'>
					Iniciar Sesión
				</button>
				<div className='txtNonePass'>
					<span>Olvide contraseña</span>
				</div>
			</form>
		</>
	);
};

export default Login;
