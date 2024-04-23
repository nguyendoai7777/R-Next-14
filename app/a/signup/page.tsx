'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UseRootTheme from '@/components/theme/use-theme';
import { useForm, useFormState } from 'react-hook-form';
import ErrorText from '@/components/error/error-text';

function SignUpPage() {
	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { dirtyFields, errors, touchedFields },
	} = useForm<{ email: string }>({
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (form: any) => {
		console.log(touchedFields, errors, getValues('email'));
	};

	const cl = () => {
		console.log(errors);
	};

	// check your dev console, it's a Set
	return (
		<UseRootTheme>
			<div className='w-full h-full flex justify-center'>
				<form onSubmit={handleSubmit(onSubmit)} className='w-[600px]'>
					<div className='text-center text-[40px] font-bold mt-12'>Signup to start listen music</div>
					<div className='max-w-[600px] mt-12'>
						<label htmlFor='email' className='mb-1'>
							Your email
						</label>
						<TextField
							{...register('email', {
								required: true,
								pattern: /^[a-zA-Z]+[\w_.+]{3,}@\w{4,}\.\w{2,4}(\.\w{2,})?$/i,
							})}
							placeholder='Ex: your_mail@gmail.com'
							fullWidth
							id='email'
							variant='outlined'
							error={touchedFields.email && !getValues('email')?.length}
						/>
						<ErrorText>
							{touchedFields.email && ((errors.email && errors.email.type === 'required') || !getValues('email')?.length) ? 'This is required' : ''}
							{touchedFields.email && errors.email && errors.email.type === 'pattern' ? 'Email format' : ''}
						</ErrorText>
						<Button variant='contained' color='spotx' type='submit' fullWidth className='py-3 rounded-full'>
							<b className='capitalize text-base'>Next</b>
						</Button>
					</div>
				</form>
			</div>
		</UseRootTheme>
	);
}
export default SignUpPage;
