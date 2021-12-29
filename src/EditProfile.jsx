//
// プロフィール編集機能
//

import React from 'react';
import { apiFetchProfile, apiUpdateProfile } from './apiwrapper';

export function useEditProfile(user) {

	const [state, setState] = React.useState(null);
	const [profile, setProfile] = React.useState(null);

	const fullnameRef = React.useRef(null);
	const homecityRef = React.useRef(null);
	
	// バックエンドからの読み込み開始
	const fetch = () => {
		setState('fetching');
		apiFetchProfile(user.username).then(profile => {
			setProfile(profile);
			setState('ready');
		}).catch(err => {
			console.log('Error in feching profile', err);
			setState('error');
		});
		return null;
	};
	
	// 表示
	const Display = () => {

		const username = user.username;
		const email = user.attributes.email;

		const onClickToUpdate = () => {
			setState('updating');
			apiUpdateProfile({
				username: username,
				email: email,
				fullname: fullnameRef.current.value,
				homecity: homecityRef.current.value
			}).then(() => {
				setState(null);
			}).catch(err => {
				console.log('Error in updating profile', err);
				setState('error');
			});
			return null;
		};

		switch (state) {
		case 'fetching':
			return <p>読み込み中</p>;
		case 'error':
			return <p>エラー発生！</p>;
		case 'updating':
			return <p>更新中</p>;
		case 'ready':
			return (
				<>
					<h2>あなたのプロフィール</h2>
					<table>
						<tbody>
							<tr>
								<td>ユーザー名</td>
								<td>{username}</td>
							</tr>
							<tr>
								<td>メール</td>
								<td>{email}</td>
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
		default:
			return null;
		}
	};

	return [fetch, Display];
}
