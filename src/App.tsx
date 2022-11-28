import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './components/Navigation/AppNavigator';
import { default as theme } from './configs/custom-theme.json';

export const App: React.FC = () => {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
					<AppNavigator />
				</ApplicationProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default App;
