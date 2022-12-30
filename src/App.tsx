import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from './components/Modal';
import Loader from './components/Loader';
import { useAppSelector } from './hooks';
import { getAllUsers } from './store/users/usersSlice';
import AddUserForm from './components/AddUserForm';
import Button from './components/Button';

const AppContainer = styled.div`
	${tw`
		grid
		place-items-center
		min-h-screen
		bg-appBackground
	`}
`;

function App() {
	const users = useAppSelector(getAllUsers);
	const [isModalOpen, setIsModalState] = useState(true);

	if (!users) return <Loader />;

	return (
		<AppContainer>
			<Button onClick={() => setIsModalState(true)}>Додати користувача</Button>

			<Modal showModal={isModalOpen} toggleModal={setIsModalState}>
				<AddUserForm toggleModal={setIsModalState} />
			</Modal>

			{/* <Outlet /> */}
			{users.map((user) => (
				<div key={user.id}>{user.fullname}</div>
			))}
		</AppContainer>
	);
}

export default App;
