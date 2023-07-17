import axios, {AxiosRequestConfig, Method} from 'axios'

const CITY = "";
const latH = 0;
const lonH = 0;
const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHER;
const BASEURL = `http://api.openweathermap.org/data/2.5/weather?APPID=${APIKEY}&units=metric&q=`
const HOURFORECASTURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latH}&lon=${lonH}&APPID=${APIKEY}`

export default async function GET<T>(iRelativeURL: string): Promise<{ success: true, body: T } | { success: false, error: string }> {
	return await Req("GET", iRelativeURL);
}

export async function GETHOURFORECAST<T>(lat: any, lon: any): Promise<{success: true, body: T} |{success: false, error: string}>{
	return await ReqH("GET", lat, lon)
}

export async function GETIPINFO<T>(): Promise<{success: true, body: T} |{success: false, error: string}>{
	return await ReqIP("GET")
}

export async function GETLOC<T>(search: string): Promise<{success: true, body: T} |{success: false, error: string}>{
	return await ReqLoc("GET", search)
}

async function Req<T>(iMethod: Method, iRelativeURL: string, iPayload?: unknown): Promise<{ success: true, body: T } | { success: false, error: string }> {

	// if (!iRelativeURL.startsWith(""))
	// 	throw Error("Must start with");

	console.log(`${iMethod} ${iRelativeURL}`);
	if (iPayload)

		console.log(iPayload);

	const axiosConfig: AxiosRequestConfig = {
		method: iMethod,
		url: `${BASEURL}${iRelativeURL}`,
		headers: {
			"Accept": "application/json",
		},
		data: iPayload
	};

	try {
		console.log(axiosConfig);
		const response = await axios(axiosConfig);
		return { success: true, body: await response.data };
	} catch (e) {
		console.log(e);
		return { success: false, error: (e as Error).message };
	}
}

async function ReqH<T>(iMethod: Method, lat: any, lon: any, iPayload?: unknown): Promise<{ success: true, body: T } | { success: false, error: string }> {

	// if (!iRelativeURL.startsWith(""))
	// 	throw Error("Must start with");

	// console.log(`${iMethod} ${iRelativeURL}`);
	if (iPayload)
		console.log(iPayload);

	const axiosConfig: AxiosRequestConfig = {
		method: iMethod,
		url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`,
		headers: {
			"Accept": "application/json",
		},
		data: iPayload
	};

	try {
		console.log(axiosConfig);
		const response = await axios(axiosConfig);
		return { success: true, body: await response.data };
	} catch (e) {
		console.log(e);
		return { success: false, error: (e as Error).message };
	}
}


async function ReqIP<T>(iMethod: Method, iPayload?: unknown): Promise<{ success: true, body: T } | { success: false, error: string }> {

	// if (!iRelativeURL.startsWith(""))
	// 	throw Error("Must start with");

	// console.log(`${iMethod} ${iRelativeURL}`);
	if (iPayload)
		console.log(iPayload);

	const axiosConfig: AxiosRequestConfig = {
		method: iMethod,
		url: `https://api.ipdata.co?api-key=${process.env.REACT_APP_API_KEY_IPDATA}`,
		headers: {
			"Accept": "application/json",
		},
		data: iPayload
	};

	try {
		console.log(axiosConfig);
		const response = await axios(axiosConfig);
		return { success: true, body: await response.data };
	} catch (e) {
		console.log(e);
		return { success: false, error: (e as Error).message };
	}
}

async function ReqLoc<T>(iMethod: Method, text: string, iPayload?: unknown): Promise<{ success: true, body: T } | { success: false, error: string }> {

	// if (!iRelativeURL.startsWith(""))
	// 	throw Error("Must start with");

	// console.log(`${iMethod} ${iRelativeURL}`);
	if (iPayload)
		console.log(iPayload);

	const axiosConfig: AxiosRequestConfig = {
		method: iMethod,
		url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_TOKEN_MAPBOX}&cachebuster=1625641871908&autocomplete=true&types=place`,
		headers: {
			"Accept": "application/json",
		},
		data: iPayload
	};

	try {
		console.log(axiosConfig);
		const response = await axios(axiosConfig);
		return { success: true, body: await response.data };
	} catch (e) {
		console.log(e);
		return { success: false, error: (e as Error).message };
	}
}