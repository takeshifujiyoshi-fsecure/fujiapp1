import {API, graphqlOperation} from 'aws-amplify';
import {createProfile, updateProfile} from './graphql/mutations';
import {getProfile, listProfiles} from './graphql/queries';

export async function apiFetchProfile(username) {
	const result = await API.graphql(graphqlOperation(getProfile, {username: username}));
	const profile = result.data.getProfile;
	return profile || {};
}

export async function apiFetchAllProfiles() {
	const result = await API.graphql(graphqlOperation(listProfiles));
	const profiles = result.data.listProfiles.items;
	return profiles;
}

export async function apiUpdateProfile(profile) {
	const result = await API.graphql(graphqlOperation(getProfile, {username: profile.username}));
	if (result.data.getProfile === null) {
		await API.graphql(graphqlOperation(createProfile, {input: profile}));
	} else {
		await API.graphql(graphqlOperation(updateProfile, {input: profile}));
	}
	return  null;
}
