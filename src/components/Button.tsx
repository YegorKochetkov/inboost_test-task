import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BUTTONS } from '@/utils/buttons';

type ButtonProps = {
	children?: ReactNode;
	type?: 'button' | 'submit' | 'reset' | undefined;
	name?: string;
	className?: string;
	buttonStyle?: string;
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| (() => void);
	isDisabled?: boolean;
};

type ButtonStyleProps = {
	buttonStyle?: string;
};

const ButtonElement = styled.button<ButtonStyleProps>`
	${tw`
		grid
		place-items-center
		px-4
		py-2.5
		text-base
		font-medium
		leading-5
		text-appBlue
		bg-white
		hover:bg-appLightBlue
		border
		border-appBlue
		rounded
		hover:shadow
		active:shadow-inner
	`}
	${(props) => props.buttonStyle === BUTTONS.primary && tw``}
	${(props) => props.buttonStyle === BUTTONS.secondary && tw``}
	${(props) => props.buttonStyle === BUTTONS.attention && tw``}
`;

function Button({
	children,
	name,
	className,
	buttonStyle,
	type = 'button',
	onClick = () => {
		return;
	},
	isDisabled,
}: ButtonProps) {
	return (
		<ButtonElement
			name={name}
			type={type}
			className={className}
			buttonStyle={buttonStyle}
			onClick={(event) => onClick(event)}
			disabled={isDisabled}
		>
			{children}
		</ButtonElement>
	);
}

export default Button;
