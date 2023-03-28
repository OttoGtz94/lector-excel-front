import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertToastify } from '../../../helpers';

const Register = () => {
	const [name, setName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] =
		useState('');

	const navigate = useNavigate();

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		if (
			[
				name,
				firstName,
				userName,
				password,
				confirmPassword,
			].includes('')
		) {
			alertToastify(
				'warn',
				'Todos los campos son obligatorios',
			);

			return;
		}

		if (password !== confirmPassword) {
			alertToastify(
				'warn',
				'Las contraseñas no coinciden',
			);

			return;
		}

		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/users/new-user`,
				{
					name,
					firstName,
					userName,
					password,
				},
			);
			alertToastify('success', data.msg);
			setName('');
			setFirstName('');
			setUserName('');
			setPassword('');
			setConfirmPassword('');
			setTimeout(() => {
				navigate('/account');
			}, 1000);
		} catch (error: any) {
			alertToastify('error', error.response.data.msg);
		}
	};
	return (
		<>
			<form className='form' onSubmit={handleSubmit}>
				<div className='group'>
					<label htmlFor='nombre'>Nombre</label>
					<input
						type='text'
						id='nombre'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className='group'>
					<label htmlFor='apellido'>Apellido</label>
					<input
						type='text'
						id='apellido'
						value={firstName}
						onChange={e =>
							setFirstName(e.target.value)
						}
					/>
				</div>
				<div className='group'>
					<label htmlFor='userName'>
						Nombre Usuario
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
						id='password'
						value={password}
						onChange={e =>
							setPassword(e.target.value)
						}
					/>
				</div>
				<div className='group'>
					<label htmlFor='confirmPassword'>
						Confirma Contraseña
					</label>
					<input
						type='password'
						id='confirmPassword'
						value={confirmPassword}
						onChange={e =>
							setConfirmPassword(e.target.value)
						}
					/>
				</div>
				<button type='submit' className='btnLogin'>
					Registrarse
				</button>
			</form>
		</>
	);
};

export default Register;
