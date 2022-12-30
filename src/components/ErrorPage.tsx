import React from 'react';
import { useRouteError } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

function ErrorPage() {
	const error = useRouteError();

	return <ErrorMessage error={String(error)} />;
}

export default ErrorPage;
