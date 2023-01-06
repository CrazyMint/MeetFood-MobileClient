import React, { createContext, useCallback, useContext, useState } from 'react';
import { Button, Modal, Text } from '../components/Common';
import { Grid } from '../components/Layout';

interface ModalData {
	title: string;
	message: string;
}

export interface ModalContextState {
	openModal: ({ title, message }: ModalData) => void;
}

export const ModalContext = createContext<ModalContextState | null>(null);

export const useModalContext = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw Error('No modal context');
	}

	return context;
};

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);
	const [queue, setQueue] = useState<Array<ModalData>>([]);

	const openModal = useCallback((data: ModalData) => {
		setQueue((queue) => [...queue, data]);
		setOpen(true);
	}, []);

	const onClose = useCallback(() => {
		setOpen(false);

		setTimeout(() => {
			setQueue([...queue.slice(1)]);

			if (queue.length > 1) {
				setOpen(true);
			}
		});
	}, [queue]);

	return (
		<ModalContext.Provider
			value={{
				openModal,
			}}
		>
			{children}

			<Modal modalHeight={188} onClosed={onClose} open={open}>
				<Grid
					style={{ padding: 24 }}
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					<Text
						style={{ alignSelf: 'flex-start', marginBottom: 16 }}
						category="h6"
						text={queue[0]?.title}
					/>
					<Text
						style={{
							alignSelf: 'flex-start',
							marginBottom: 24,
							color: '#7D7A77',
						}}
						category="p1"
						text={queue[0]?.message}
					/>
					<Button
						style={{
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
						text="Try again"
						onPress={() => setOpen(false)}
					/>
				</Grid>
			</Modal>
		</ModalContext.Provider>
	);
};

export default ModalContext;
