import React, { Fragment, useState } from 'react';
import tw from 'twin.macro';
import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addUser, getAllUsers } from '@/store/users/usersSlice';
import { User } from '@/types/user';
import Button from './Button';
import PhoneCountryInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PatternFormat } from 'react-number-format';
import { Listbox, Transition } from '@headlessui/react';
import { IoIosArrowForward, IoMdRadioButtonOff } from 'react-icons/io';
import { RiRadioButtonFill } from 'react-icons/ri';

const StyledForm = tw(Form)`
	flex
	flex-col
	sm:grid
	sm:grid-cols-2
	gap-y-2
	gap-x-6
	w-full
	min-w-fit
	p-3
	pb-5
`;

const FormInput = styled(Field)<{ error?: string }>`
	${tw`
		h-10
		px-2
		py-1
		rounded-[0.2rem]
		border
		border-appLightBlue
	`}
	${(props) => props.error && tw``}
`;

const FormLabel = styled.label<{ error?: boolean }>`
	${tw`
		flex
		flex-col
		justify-between
		min-h-[1.25rem]
		text-sm
		text-appDarkGrey
	`}
	${(props) => props.error && tw`text-appError [input]:text-appDarkGrey`}
`;

const FormPhoneInput = tw.div`
	relative
	flex
	justify-start
	[&>input]:absolute
	[&>input]:bottom-0
	[&>input]:pl-14
	[&>input]:h-10
	[&>input]:w-full
	[.react-tel-input_.selected-flag]:bg-transparent
	[.react-tel-input_.selected-flag.open]:bg-transparent
	[.react-tel-input_.selected-flag_.arrow]:transition-all
	[.react-tel-input_.selected-flag_.arrow]:w-2
	[.react-tel-input_.selected-flag_.arrow]:h-2
	[.react-tel-input_.selected-flag_.arrow]:border-2
	[.react-tel-input_.selected-flag_.arrow]:border-t-transparent
	[.react-tel-input_.selected-flag_.arrow]:border-l-transparent
	[.react-tel-input_.selected-flag_.arrow]:border-appBlue
	[.react-tel-input_.selected-flag_.arrow]:rotate-45
	[.react-tel-input_.selected-flag_.arrow]:top-[0.05rem]
	[.react-tel-input_.selected-flag_.arrow]:ml-[0.2rem]
	[.react-tel-input_.selected-flag_.arrow.up]:border-2
	[.react-tel-input_.selected-flag_.arrow.up]:border-solid
	[.react-tel-input_.selected-flag_.arrow.up]:rotate-[225deg]
	[.react-tel-input_.selected-flag_.arrow.up]:top-[0.4rem]
	[.react-tel-input_.country-list]:m-0
	[.react-tel-input_.country-list]:-ml-[1px]
	[.react-tel-input_.country-list]:border
	[.react-tel-input_.country-list]:border-appLightBlue
	[.react-tel-input_.country-list]:w-max
	[.react-tel-input_.country-list]:shadow
	[.react-tel-input_.country-list_.country:hover]:bg-appLightBlue
`;

const emailMask =
	/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

type AddUserFormProps = {
	toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
	title: string;
	fullname: string;
	phone: string;
	email: string;
	role: string;
	lang: string;
	additionalFieldTitle: string;
	additionalFieldContent: string;
};

const additionalTitle = ['Заголовок', 'text', 'text2', 'text3'];

function AddUserForm({ toggleModal }: AddUserFormProps) {
	const dispatch = useAppDispatch();
	const users = useAppSelector(getAllUsers);
	const [format, setFormat] = useState('');
	const [selectedAdditionalTitle, setSelectedAdditionalTitle] = useState(
		additionalTitle[0]
	);

	return (
		<Formik
			initialValues={{
				title: '',
				fullname: '',
				phone: '',
				email: '',
				role: '',
				lang: '',
				additionalFieldTitle: '',
				additionalFieldContent: '',
			}}
			validationSchema={Yup.object({
				title: Yup.string()
					.trim()
					.max(200, 'Максимальна довжина 200 символів')
					.required('обов`язкове поле'),
				fullname: Yup.string()
					.trim()
					.max(300, 'Максимальна довжина 300 символів')
					.required('обов`язкове поле'),
				phone: Yup.string()
					.min(format.length, `має бути ${format.length} цифр`)
					.required('обов`язкове поле'),
				email: Yup.string()
					.trim()
					.matches(emailMask, 'Перевірте формат пошти')
					.required('обов`язкове поле'),
				role: Yup.string().required('обов`язкове поле'),
				lang: Yup.string().required('обов`язкове поле'),
				additionalFieldTitle: Yup.string().required('обов`язкове поле'),
				additionalFieldContent: Yup.string().required('обов`язкове поле'),
			})}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				const id = String(
					users[users.length - 1] ? users[users.length - 1].id + 1 : 1
				);
				const date = String(new Date());
				const url = 'https://yesoriginal.inboost.ai/api/webhok/retwsdhgds32/';
				const newUser: User = { ...values, id, date, url };
				toggleModal(false);
				dispatch(addUser(newUser));
				setSubmitting(false);
				resetForm();
			}}
		>
			{({
				errors,
				touched,
				values,
				validateForm,
				handleBlur,
				isValid,
				dirty,
			}: FormikProps<FormValues>) => (
				<StyledForm>
					<FormLabel
						htmlFor='title'
						error={touched.title && errors.title ? true : false}
					>
						Назва {touched.title && errors.title ? '- ' : ''}
						<ErrorMessage name='title' />
						<FormInput
							type='text'
							name='title'
							placeholder='Статус посилки'
							minLength={1}
							maxLength={200}
							required
						/>
					</FormLabel>

					<FormLabel
						htmlFor='fullname'
						error={touched.fullname && errors.fullname ? true : false}
					>
						Ім’я та фамілія {touched.fullname && errors.fullname ? '- ' : ''}
						<ErrorMessage name='fullname' />
						<FormInput
							type='text'
							name='fullname'
							placeholder='Через пробіл'
							minLength={1}
							maxLength={300}
							required
						/>
					</FormLabel>

					<FormLabel
						htmlFor='phone'
						error={touched.phone && errors.phone ? true : false}
					>
						Номер телефону {touched.phone && errors.phone ? '- ' : ''}
						{touched.phone && errors.phone && <ErrorMessage name='phone' />}
						<FormPhoneInput>
							<PhoneCountryInput
								country='ua'
								inputStyle={{
									visibility: 'hidden',
									width: '0',
									paddingLeft: '0',
								}}
								buttonStyle={{
									backgroundColor: '#EAF2FF',
									borderColor: '#CFE2FF',
									zIndex: '10',
									width: '46px',
								}}
								containerStyle={{ height: '2.5rem' }}
								onChange={(_inputNumber, data) => {
									const currCountry = data as CountryData;
									const currFormat = currCountry.format;
									setFormat(currFormat);
								}}
								onMount={(_value, data) => {
									const currCountry = data as CountryData;
									setFormat(currCountry.format);
								}}
							/>
							<PatternFormat
								format={format}
								patternChar='.'
								allowEmptyFormatting
								mask='_'
								onValueChange={(patternValues) => {
									values.phone = patternValues.formattedValue
										.slice()
										.replaceAll('_', '');
									delete errors['phone'];
									validateForm();
								}}
								customInput={FormInput}
								name='phone'
								id='phone'
								type='tel'
								onBlur={handleBlur}
								required={true}
							/>
						</FormPhoneInput>
					</FormLabel>

					<FormLabel
						htmlFor='email'
						error={touched.email && errors.email ? true : false}
					>
						Email {touched.email && errors.email ? '- ' : ''}
						<ErrorMessage name='email' />
						<FormInput
							type='text'
							name='email'
							placeholder='user@example.com'
							required
						/>
					</FormLabel>

					<FormLabel
						htmlFor='role'
						error={touched.role && errors.role ? true : false}
					>
						Група користувачів {touched.role && errors.role ? '- ' : ''}
						<ErrorMessage name='role' />
						<FormInput type='text' name='role' required />
					</FormLabel>

					<FormLabel
						htmlFor='lang'
						error={touched.lang && errors.lang ? true : false}
					>
						Мова {touched.lang && errors.lang ? '- ' : ''}
						<ErrorMessage name='lang' />
						<FormInput type='text' name='lang' required />
					</FormLabel>

					<FormLabel
						htmlFor='additionalFieldTitle'
						error={
							touched.additionalFieldTitle && errors.additionalFieldTitle
								? true
								: false
						}
					>
						Додати нове поле{' '}
						{touched.additionalFieldTitle && errors.additionalFieldTitle
							? '- '
							: ''}
						<ErrorMessage name='additionalFieldTitle' />
						<Listbox
							value={selectedAdditionalTitle}
							onChange={(title) => {
								setSelectedAdditionalTitle(title);
								values.additionalFieldTitle = title;
								validateForm();
							}}
						>
							{({ open }) => (
								<div className='relative mt-1'>
									<Listbox.Button
										className={`relative w-full h-10 cursor-pointer rounded ${
											open ? 'rounded-b-none shadow-xl' : ''
										} bg-white py-2 pl-3 pr-10 text-left border border-appLightBlue text-sm`}
									>
										<span className='block truncate'>
											{selectedAdditionalTitle}
										</span>
										<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
											<IoIosArrowForward
												className={`h-5 w-5 text-appBlue rotate-90 transition-transform ${
													open ? 'rotate-[270deg]' : ''
												}`}
												aria-hidden='true'
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave='transition ease-in duration-100'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<Listbox.Options className='absolute z-20 max-h-30 w-full overflow-auto rounded rounded-t-none bg-white border border-appLightBlue border-t-0 text-sm shadow-xl focus:outline-none sm:text-sm'>
											{additionalTitle.slice(1).map((title, titleIndex) => (
												<Listbox.Option
													key={titleIndex}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-appLightBlue border-b border-b-appLightBlue last:border-none transition-colors ${
															active ? 'bg-appLightBlue' : ''
														}`
													}
													value={title}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected ? 'font-medium' : 'font-normal'
																}`}
															>
																{title}
															</span>
															{selected ? (
																<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
																	<RiRadioButtonFill className=' text-appBlue h-5 w-5' />
																</span>
															) : (
																<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
																	<IoMdRadioButtonOff className=' text-appBlue h-5 w-5' />
																</span>
															)}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							)}
						</Listbox>
					</FormLabel>

					<FormLabel
						htmlFor='additionalFieldContent'
						error={
							touched.additionalFieldContent && errors.additionalFieldContent
								? true
								: false
						}
					>
						Значення поля{' '}
						{touched.additionalFieldContent && errors.additionalFieldContent
							? '- '
							: ''}
						<ErrorMessage name='additionalFieldContent' />
						<FormInput type='text' name='additionalFieldContent' />
					</FormLabel>

					<Button
						type='submit'
						name='submit'
						onClick={() => console.log(errors)}
						className={`mt-28 col-start-2 ${
							!isValid || !dirty ? 'opacity-50' : ''
						}`}
					>
						Додати користувача
					</Button>
				</StyledForm>
			)}
		</Formik>
	);
}

export default AddUserForm;
