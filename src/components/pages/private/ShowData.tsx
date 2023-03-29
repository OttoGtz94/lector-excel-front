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

const ShowExcel = () => {
	const { usuariosExcel, saveInBD, setStateUsersExcel } =
		useUserExcel();
	const [usuarios, setUsuarios] = useState<number[]>([]);
	const [openDialog, setOpenDialog] =
		useState<boolean>(false);
	const [userEdit, setUserEdit] =
		useState<UsuariosExcel>();

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

			<Dialog
				open={openDialog}
				onClose={() => {
					setOpenDialog(false);
					setUserEdit({});
				}}
				style={{}}>
				<DialogTitle>
					Editar {userEdit?.user_name}-{userEdit?.date}
				</DialogTitle>
				<DialogContent>
					Puedes modificar el <strong>nombre</strong> y
					las horas de <strong>entrada</strong> y{' '}
					<strong>salida</strong>.
				</DialogContent>
				<DialogContent
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-around',
					}}>
					<TextField
						autoFocus
						margin='dense'
						label='Nombre'
						defaultValue={userEdit?.user_name || ''}
						fullWidth
						required
						onChange={(e: any) =>
							setUserEdit({
								...userEdit,
								user_name: e.target.value,
							})
						}
					/>
					<LocalizationProvider
						dateAdapter={AdapterDayjs}>
						<Box
							width={'100%'}
							display={'flex'}
							flexWrap={'wrap'}
							justifyContent={'space-between'}
							marginTop={'10px'}
							marginBottom={'10px'}>
							<TimePicker
								label={'Hora de entrada'}
								defaultValue={
									userEdit?.punch_in
										? dayjs(
												formatHourString(
													userEdit?.punch_in,
												),
										  )
										: null
								}
								onChange={e =>
									setUserEdit({
										...userEdit,
										punch_in:
											e?.format('HH:mm:a'),
									})
								}
							/>
							<TimePicker
								label={'Hora de salida'}
								defaultValue={
									userEdit?.punch_out
										? dayjs(
												formatHourString(
													userEdit?.punch_out,
												),
										  )
										: null
								}
								onChange={e =>
									setUserEdit({
										...userEdit,
										punch_out:
											e?.format('HH:mm:a'),
									})
								}
							/>
						</Box>
					</LocalizationProvider>
					<Button
						text='Actualizar'
						onClick={onClickUpdate}
						type='button'
						style={{
							bgColor: '#ff9800',
							width: '100px',
						}}
					/>

					<Button
						text='Cancelar'
						onClick={() => {
							setOpenDialog(false);
							setUserEdit({});
						}}
						type='button'
						style={{
							bgColor: '#363636',
							width: '100px',
						}}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ShowExcel;
