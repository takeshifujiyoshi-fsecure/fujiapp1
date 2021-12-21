const mockProfiles = [
	{username: 'nancy', email: 'nancy@dokoka.com', fullname: 'Nancy Tempura', homecity: 'New York'},
	{username: 'keiko', email: 'keiko@dokoka.com', fullname: 'Keiko Tenkasu', homecity: 'Tokyo'},
	{username: 'takeo', email: 'takeo@dokoka.com', fullname: 'Takeo General', homecity: 'Gifu'},
	{username: 'fuji', email: 'fuji@something.com', fullname: 'Takeshi Tempura', homecity: 'Gifu'}
];

export async function apiFetchProfile(username) {
	let profile = {};
	await new Promise((resolve)=>{
		setTimeout(()=>{
			const a = mockProfiles.filter(p => p.username === username)
			profile = (a.length > 0) ? a[0] : {};
			resolve();
		}, 1000);
	});
	return profile;
}

export async function apiFetchAllProfiles() {
	let profiles = [];
	await new Promise((resolve)=>{
		setTimeout(()=>{
			profiles = [...mockProfiles]
			resolve();
		}, 1000);
	});
	return profiles;
}

export async function apiUpdateProfile(profile) {
	await new Promise((resolve)=>{
		setTimeout(()=>{
			resolve();
		}, 1000);
	});
	return  null;
}
