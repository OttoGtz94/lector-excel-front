import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import {
	LocalizationProvider,
	TimePicker,
} from '@mui/x-date-pickers';
import React from 'react';
import dayjs from 'dayjs';
import Button from './Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatHourString } from '../../helpers';
import { DialogEditInterface } from '../../interfaces/dialog.edit.interface';

const DialogEdit = ({
	openDialog,
	setOpenDialog,
	setUserEdit,
	objUser,
	onClickUpdate,
}: DialogEditInterface) => {
	return (
		<Dialog
			open={openDialog}
			onClose={() => {
				setOpenDialog(false);
				setUserEdit({});
			}}
			style={{}}>
			<DialogTitle>
				Editar {objUser?.user_name}-{objUser?.date}
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
					defaultValue={objUser?.user_name || ''}
					fullWidth
					required
					onChange={(e: any) =>
						setUserEdit({
							...objUser,
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
								objUser?.punch_in
									? dayjs(
											formatHourString(
												objUser?.punch_in,
											),
									  )
									: null
							}
							onChange={e =>
								setUserEdit({
									...objUser,
									punch_in: e?.format('HH:mm:a'),
								})
							}
						/>
						<TimePicker
							label={'Hora de salida'}
							defaultValue={
								objUser?.punch_out
									? dayjs(
											formatHourString(
												objUser?.punch_out,
											),
									  )
									: null
							}
							onChange={e =>
								setUserEdit({
									...objUser,
									punch_out: e?.format('HH:mm:a'),
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
	);
};

export default DialogEdit;
