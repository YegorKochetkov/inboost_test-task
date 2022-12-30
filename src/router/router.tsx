import React from 'react';
import { createHashRouter, redirect } from 'react-router-dom';
import App from '@/App';
import JobDetails from '@/components/JobDetails';
import ErrorPage from '@/components/ErrorPage';
import PaginatedItems from '@/components/PaginatedItems';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		// loader: () => redirect(appUsersListPath + '1'),
	},
	// {
	// 	path: appRootPath,
	// 	element: <App />,

	// 	errorElement: <ErrorPage />,
	// 	// loader: () => redirect(appUsersListPath + '1'),
	// },
	// {
	// 	path: appUsersListPath,
	// 	errorElement: <ErrorPage />,
	// 	// loader: () => redirect(appUsersListPath + '1'),
	// },
	// {
	// 	path: appUsersListPath,
	// 	element: <App />,
	// 	errorElement: <ErrorPage />,
	// 	children: [
	// 		{
	// 			path: ':page',
	// 			element: <PaginatedItems />,
	// 			loader: ({ params }) => {
	// 				const parsedParams = Number(params.page);

	// 				if (!parsedParams) {
	// 					const error = {
	// 						status: 404,
	// 						statusText: 'Wrong address!',
	// 					};

	// 					throw error;
	// 				}
	// 			},
	// 			errorElement: <ErrorPage />,
	// 		},
	// 	],
	// },
	// {
	// 	path: appJobDetailsPath,
	// 	loader: ({ params }) => {
	// 		if (!params.jobId) {
	// 			const error = {
	// 				status: 404,
	// 				statusText: 'You should choose job!',
	// 			};

	// 			throw error;
	// 		}

	// 		return;
	// 	},
	// 	errorElement: <ErrorPage />,
	// 	children: [
	// 		{
	// 			path: ':jobId',
	// 			element: <JobDetails />,
	// 			errorElement: <ErrorPage />,
	// 		},
	// 	],
	// },
]);

export default router;
