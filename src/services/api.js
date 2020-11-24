import axios from 'axios';

export async function getObjectsFromApi(url) {
	try {
		const result = await axios.get(url);
		return result;
	} catch (error) {
		console.log("getObjectsFromApi Error:", error);
		return null;
	}
}