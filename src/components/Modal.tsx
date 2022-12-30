import React, { ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import tw from 'twin.macro';
import { IoMdClose, IoMdAdd } from 'react-icons/io';
const DialogWrapper = tw.div`
	fixed
	inset-0
	overflow-y-auto
`;

const DialogContainer = tw.div`
	grid
	place-items-center
	min-h-full
`;

const ModalWindow = tw(Dialog)`relative z-10`;

const DialogContent = tw(Dialog.Panel)`
	w-full
	max-w-xl
	transform
	overflow-y-auto
	rounded
	bg-white
	text-left
	align-middle
	shadow-xl
	transition-all
`;

const DialogTitle = tw(Dialog.Title)`
	flex
	items-center
	text-sm
	font-medium
	leading-6
	text-gray-900
	py-3
	px-4
	border-appLightBlue
	border-b
`;

const overlay = <div className='fixed inset-0 bg-black bg-opacity-25' />;

type ModalProps = {
	children: ReactNode;
	showModal: boolean;
	toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, showModal, toggleModal }: ModalProps) {
	return (
		<Transition appear show={showModal} as={Fragment}>
			<ModalWindow onClose={() => toggleModal(false)}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					{overlay}
				</Transition.Child>

				<DialogWrapper>
					<DialogContainer>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<DialogContent>
								<DialogTitle>
									<IoMdAdd className={'h-6 w-6 text-appBlue mr-4'} />
									<span>Редагувати сутність</span>
									<button
										type='button'
										onClick={() => toggleModal(false)}
										className='ml-auto'
									>
										<IoMdClose
											className={
												'h-5 w-5 text-appLightGrey hover:text-appBlue active:bg-appLightGrey2 rounded-full transition-colors'
											}
										/>
									</button>
								</DialogTitle>
								{children}
							</DialogContent>
						</Transition.Child>
					</DialogContainer>
				</DialogWrapper>
			</ModalWindow>
		</Transition>
	);
}

export default Modal;
