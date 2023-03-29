import React, { useState } from 'react';
import useUserExcel from '../../../hooks/useUserExcel';
import { UsuariosExcel } from '../../../interfaces/users.excel.interface';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
	alertToastify,
	formatHourString,
} from '../../../helpers/index';
import {
	LocalizationProvider,
	TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/system';
import dayjs from 'dayjs';
import Button from '../../layouts/Button';
import TableRegisters from '../../layouts/TableRegisters';
import DialogEdit from '../../layouts/DialogEdit';

const ShowExcel = () => {
	const { usuariosExcel, saveInBD, setStateUsersExcel } =
		useUserExcel();
	const [usuarios, setUsuarios] = useState<number[]>([]);
	const [openDialog, setOpenDialog] =
		useState<boolean>(false);
	const [userEdit, setUserEdit] = useState<UsuariosExcel>(
		{},
	);

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'id',
			width: 130,
		},
		{
			field: 'user_id',
			headerName: 'user_id',
			width: 130,
		},
		{
			field: 'user_name',
			headerName: 'user_name',
			width: 130,
		},
		{
			field: 'date',
			headerName: 'date',
			width: 130,
		},
		{
			field: 'punch_in',
			headerName: 'punch_in',
			width: 130,
		},
		{
			field: 'punch_out',
			headerName: 'punch_out',
			width: 130,
		},
	];
	const rows: UsuariosExcel[] = usuariosExcel.filter(
		(usuario: UsuariosExcel) => usuario.save === false,
	);

	const onCickSaveBD = () => {
		if (usuarios.length === 0) {
			alertToastify(
				'error',
				'No seleccionaste ningún registro',
			);
			return;
		}
		const usersToSendBD: UsuariosExcel[] = [];

		usuariosExcel.filter((usuario: UsuariosExcel) => {
			usuarios.filter((usuarioId: number) => {
				usuario.id === usuarioId
					? usersToSendBD.push(usuario)
					: null;
			});
		});
		saveInBD(usersToSendBD);
	};

	const onClickEdit = () => {
		if (usuarios.length > 1) {
			alertToastify(
				'error',
				'No puedes editar más de un registro al mismo tiempo, solo selecciona 1.',
			);
		} else if (usuarios.length === 0) {
			alertToastify(
				'error',
				'Selecciona un registro a editar',
			);
		} else {
			setOpenDialog(true);
			const usuarioSelecto: UsuariosExcel[] =
				usuariosExcel.filter(
					(usuario: UsuariosExcel) =>
						usuario.id === usuarios[0],
				);
			if (!usuarioSelecto.length) {
				alertToastify('error', 'Hubo un error.');
				return;
			}
			setUserEdit(usuarioSelecto[0]);
		}
	};

	//Editar registros antes de guardar en la BD
	const onClickUpdate = () => {
		usuariosExcel.forEach((usuario: UsuariosExcel) =>
			usuario.id === userEdit?.id
				? ((usuario.user_name = userEdit?.user_name),
				  (usuario.punch_in = userEdit?.punch_in),
				  (usuario.punch_out = userEdit?.punch_out))
				: null,
		);
		setStateUsersExcel(usuariosExcel);
		setOpenDialog(false);
		setUserEdit({});
	};

	return (
		<div>
			{rows.length > 0 ? (
				<>
					<TableRegisters
						columns={columns}
						rows={rows}
						onRowSelectionModelChange={e =>
							setUsuarios(e)
						}
					/>
					<Button
						text='Guardar en BD'
						onClick={onCickSaveBD}
						style={{
							width: '200px',
							margin: '3px 0px 0px 0px',
						}}
						type='button'
					/>
					<Button
						text='Editar registro'
						onClick={onClickEdit}
						style={{
							width: '200px',
							margin: '3px 0px 0px 10px',
							bgColor: '#ffcc00',
						}}
					/>
				</>
			) : (
				<p>No hay datos</p>
			)}
			<DialogEdit
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				setUserEdit={setUserEdit}
				objUser={userEdit}
				onClickUpdate={onClickUpdate}
			/>
		</div>
	);
};

export default ShowExcel;
