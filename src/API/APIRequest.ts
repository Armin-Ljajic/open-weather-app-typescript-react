import axios, {AxiosRequestConfig, Method} from 'axios'

const CITY = "";
const latH = 0;
const lonH = 0;
const APIKEY = "db653252d75bbc24614c714e782c18c2"
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
		url: `https://api.ipdata.co?api-key=e2df557e15d7a8eea3f12e17d4a3f29e7f3b4a3a87b5432ec5b224cb`,
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