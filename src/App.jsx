import React from 'react';
import {
	apiFetchProfile,
	apiFetchAllProfiles,
	apiUpdateProfile
} from './apiwrapper';

// Amplify / Auth
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({signOut, user}) {

	const [viewMode, setViewMode] = React.useState(null);
	const [profile, setProfile] = React.useState({});
	const [allProfiles, setAllProfiles] = React.useState([]);
	
	const onClickToEditProfile = () => {
		setViewMode('fetching');
		apiFetchProfile(user.username).then(profile => {
			setProfile(profile);
			setViewMode('edit-profile');
		}).catch(err => {
			console.log('Error in feching profile', err);
			setViewMode('error');
		});
	};

	const onClickToListProfiles = () => {
		setViewMode('fetching');
		apiFetchAllProfiles().then(profiles => {
			setAllProfiles(profiles);
			setViewMode('list-profiles');
		}).catch(err => {
			console.log('Error in fetching all profiles', err);
			setViewMode('error');
		});
	};

	const onClickToClearScreen = () => {
		setViewMode(null);
	};

	const fullnameRef = React.useRef(null);
	const homecityRef = React.useRef(null);
	
	const EditProfile = () => {
		const onClickToUpdate = () => {
			setViewMode('updating');
			apiUpdateProfile(
				{
					username: user.username,
					email: user.attributes.email,
					fullname: fullnameRef.current.value,
					homecity: homecityRef.current.value
				}
			).then(() => {
				setViewMode(null);
			}).catch(err => {
				console.log('Error in updating profile', err);
				setViewMode('error');
			});
			return null;
		};

		return (
			<>
				<h2>あなたのプロフィール</h2>
				<table>
					<tbody>
						<tr>
							<td>ユーザー名</td>
							<td>{user.username}</td>
						</tr>
						<tr>
							<td>メール</td>
							<td>{user.attributes.email}</td>
						</tr>
						<tr>
							<td>名前</td>
							<td><input type='text' name='fullname' defaultValue={profile.fullname} ref={fullnameRef}/></td>
						</tr>
						<tr>
							<td>出身地</td>
							<td><input type='text' name='homecity' defaultValue={profile.homecity} ref={homecityRef}/></td>
						</tr>
					</tbody>
				</table>
				<button onClick={onClickToUpdate}>プロフィールを更新</button>
			</>
		);
	};

	const ListProfiles = () => {
		if (!Array.isArray(allProfiles)) {
			return null;
		}
		return (
			<>
				<h2>プロフィール一覧</h2>
				<table>
					<thead>
						<td>ユーザー名</td>
						<td>メール</td>
						<td>名前</td>
						<td>出身地</td>
					</thead>
					<tbody> {
						allProfiles.map((p) => (
							<tr>
								<td>{p.username}</td>
								<td>{p.email}</td>
								<td>{p.fullname}</td>
								<td>{p.homecity}</td>
							</tr>
						))
					}
					</tbody>
				</table>
			</>
		);
	};

	const ViewScreen = () => {
		switch (viewMode) {
		case 'fetching':
			return <p>読み込み中</p>;
		case 'updating':
			return <p>更新中</p>;
		case 'error':
			return <p>エラー発生！</p>;
		case 'edit-profile':
			return <EditProfile />;
		case 'list-profiles':
			return <ListProfiles />;
		default:
			return null;
		}
	};
  
	return (
		<>
			<h1>フジアプリへようこそ</h1>
			<p>ユーザー: {user.username}</p>
			<button onClick={onClickToEditProfile}>
				プロフィール設定
			</button>
			<button onClick={onClickToListProfiles}>
				プロフィール一覧表示
			</button>
			<button onClick={onClickToClearScreen}>
				画面クリア
			</button>
			<button onClick={signOut}>
				サインアウト
			</button>
			<ViewScreen />
		</>
	);
}

export default withAuthenticator(App);

// test
