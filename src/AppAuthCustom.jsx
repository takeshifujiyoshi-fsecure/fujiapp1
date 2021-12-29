//
// 認証機能でメインページをラップ (カスタム版)
//

import { Main } from './Main'
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react-v1';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {

	const [authState, setAuthState] = React.useState();
	const [user, setUser] = React.useState();

	React.useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUser(authData);
		});
	}, []);

	const signOut = () => {
		Amplify.Auth.signOut()
			.catch((error) => {
				console.log('error signing out: ', error);
			})
			.finally(() => {
				document.location.reload();
			});
	};

	if (authState === AuthState.SignedIn && user) {
		return <Main signOut={signOut} user={user} />;
	} else {
		return <AmplifyAuthenticator />;
	}
}

export default App;
