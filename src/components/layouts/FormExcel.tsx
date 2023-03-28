import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertToastify } from '../../helpers';
import useUserExcel from '../../hooks/useUserExcel';
import { UsuariosExcel } from '../../interfaces/users.excel.interface';
import Button from './Button';

const FormExcel = () => {
	const [fileExcel, setFileExcel] = useState<any>();
	const navigate = useNavigate();
	const { setStateUsersExcel } = useUserExcel();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendExcel();
	};

	const onChangeTypeXlsx = async (file: File) => {
		const { name } = file;
		const reader = new FileReader();
		const arrName = name.split('.');
		const type = arrName[arrName.length - 1];
		let binary: any;

		if (type !== 'xlsx') {
			alertToastify(
				'warn',
				`El archivo tiene la extensión ${type} y no xlsx`,
			);
			return;
		} else {
			reader.onloadend = () => {
				binary = reader.result;
			};
			if (file) {
				reader.readAsDataURL(file);
			}
			setFileExcel(file);
			alertToastify(
				'success',
				'Archivo cargado correctamente',
			);
		}
	};

	const sendExcel = async () => {
		const data = new FormData();
		data.append('file', fileExcel);

		try {
			const res = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/excel/read-excel`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			alertToastify('success', res.data.msg);
			setStateUsersExcel(res.data.data);

			setTimeout(() => {
				navigate('show-excel');
			}, 1500);
		} catch (error: any) {
			alertToastify('error', error.response.data.msg);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='file'
					name='excel'
					id='excel'
					onChange={(e: any) =>
						onChangeTypeXlsx(e.target.files[0])
					}
				/>
				<Button
					text='Cargar'
					type='submit'
					style={{ width: '100%', margin: '3px 0px' }}
				/>
			</form>
		</>
	);
};

export default FormExcel;
