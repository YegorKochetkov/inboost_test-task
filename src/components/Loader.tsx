import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const LoaderContainer = styled.div`
	${tw`
		w-[3em]
		h-[3em]
		absolute
		top-[calc(50% - (3em / 2))]
		right-1/2
		p-1
		bg-white
		rounded-full
		shadow-xl
	`}
`;

const LoaderSpin = tw.div`
	w-full
	h-full
	rounded-full
	border-[6px]
	border-t-transparent
	border-appBlue
	animate-spin
`;

function Loader() {
	return (
		<LoaderContainer>
			<LoaderSpin />
		</LoaderContainer>
	);
}

export default Loader;
