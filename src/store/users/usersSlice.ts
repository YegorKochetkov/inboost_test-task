import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '@/types/user';

type UsersState = {
	users: User[];
};

const initialState: UsersState = {
	users: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			state.users.push(action.payload);
		},
		removeUser: (state, action: PayloadAction<string>) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
		},
		updateUser: (state, action: PayloadAction<User>) => {
			state.users = state.users.map((user) => {
				if (user.id === action.payload.id) {
					return action.payload;
				}

				return user;
			});
		},
	},
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;

export const getAllUsers = (state: RootState) => state.users;
export const selectUser = (state: RootState, id: string) =>
	state.users.find((user) => user.id === id);

export default usersSlice.reducer;
