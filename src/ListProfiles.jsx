//
// プロフィール一覧表示機能
//

import React from 'react';
import { apiFetchAllProfiles } from './apiwrapper';

export function useListProfiles() {

	const [state, setState] = React.useState(null);
	const [profiles, setProfiles] = React.useState(null);

	// バックエンドからの読み込み開始
	const fetch = () => {
		setState('fetching');
		apiFetchAllProfiles().then(profiles => {
			setProfiles(profiles);
			setState('ready');
		}).catch(err => {
			console.log('Error in fetching all profiles', err);
			setState('error');
		});
	};

	// 表示
	const Display = () => {
		switch (state) {
		case 'fetching':
			return <p>読み込み中</p>;
		case 'error':
			return <p>エラー発生！</p>;
		case 'ready':
			if (!Array.isArray(profiles)) {
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
							profiles.map((p) => (
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
		default:
			return null;
		}
	};

	return [fetch, Display];
}
