import React, { useEffect, useRef } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';

export interface ModalProps extends ModalizeProps {
	open: boolean;
}

export const Modal: React.FC<ModalProps> = ({
	open,
	children,
	onOpen,
	onClose,
	...rest
}) => {
	const modalRef = useRef<Modalize>(null);
	const modalIsOpened = useRef(open);

	useEffect(() => {
		if (open) {
			if (!modalIsOpened.current) {
				modalIsOpened.current = true;
				modalRef.current?.open();
			}
		} else {
			if (modalIsOpened.current) {
				modalIsOpened.current = false;
				modalRef.current?.close();
			}
		}
	}, [open]);

	return (
		<Modalize
			ref={modalRef}
			modalHeight={188}
			onOpen={() => {
				if (!modalIsOpened.current) {
					modalIsOpened.current = true;
					onOpen?.();
				}
			}}
			onClose={() => {
				if (modalIsOpened.current) {
					modalIsOpened.current = false;
					onClose?.();
				}
			}}
			{...rest}
		>
			{children}
		</Modalize>
	);
};

export default Modal;
