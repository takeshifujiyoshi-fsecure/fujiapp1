import { useEditProfile } from './EditProfile';
import { useListProfiles } from './ListProfiles';

import React from 'react';
import Amplify from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({signOut, user}) {

	const [state, setState] = React.useState(null);
	const [fetchEditProfile, DisplayEditProfile] = useEditProfile(user.username, user.email);
	const [fetchListProfiles, DisplayListProfiles] = useListProfiles();
	
	const onClickToEditProfile = () => {
		setState('edit-profile');
		fetchEditProfile();
	};

	const onClickToListProfiles = () => {
		setState('list-profiles');
		fetchListProfiles();
	};

	const onClickToClearScreen = () => {
		setState(null);
	};

	const Display = () => {
		switch (state) {
		case 'edit-profile':
			return <DisplayEditProfile />;
		case 'list-profiles':
			return <DisplayListProfiles />;
		default:
			return null;
		}
	}
		
	return (
		<>
			<h1>フジアプリへようこそ</h1>
			<p>ユーザー: {user.username}</p>
			<button onClick={onClickToEditProfile}>プロフィール設定</button>
			<button onClick={onClickToListProfiles}>プロフィール一覧表示</button>
			<button onClick={onClickToClearScreen}>画面クリア</button>
			<button onClick={signOut}>サインアウト</button>
			<Display />
		</>
	);
}

export default withAuthenticator(App);
