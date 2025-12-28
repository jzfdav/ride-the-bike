export interface WeatherData {
	temp: number;
	code: number;
	rainProb: number;
}

export interface AQIData {
	value: number;
	label: string;
}

export interface LocationData {
	city: string;
}

export interface RiderInsights {
	weather: WeatherData;
	aqi: AQIData;
	location: LocationData;
	lastUpdated: string;
}

export async function fetchRiderInsights(
	lat: number,
	lon: number,
): Promise<RiderInsights> {
	try {
		const [wRes, aRes, lRes] = await Promise.all([
			fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=precipitation_probability&forecast_days=1`,
			),
			fetch(
				`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`,
			),
			fetch(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
			),
		]);

		if (!wRes.ok || !aRes.ok || !lRes.ok) {
			throw new Error("One or more APIs are currently unreachable.");
		}

		const wData = await wRes.json();
		const aData = await aRes.json();
		const lData = await lRes.json();

		const currentHour = new Date().getHours();
		const rainProb =
			wData.hourly?.precipitation_probability?.[currentHour] || 0;

		const aqiVal = aData.current.us_aqi || 0;
		let aqiLabel = "Good";
		if (aqiVal > 50) aqiLabel = "Moderate";
		if (aqiVal > 100) aqiLabel = "Unhealthy";
		if (aqiVal > 150) aqiLabel = "Very Unhealthy";
		if (aqiVal > 200) aqiLabel = "Hazardous";

		return {
			weather: {
				temp: Math.round(wData.current.temperature_2m || 0),
				code: wData.current.weather_code || 0,
				rainProb: rainProb,
			},
			aqi: {
				value: aqiVal,
				label: aqiLabel,
			},
			location: {
				city: lData.city || lData.locality || "Unknown Area",
			},
			lastUpdated: new Date().toISOString(),
		};
	} catch (error) {
		console.error("Rider Insights Fetch Error:", error);
		throw error instanceof Error ? error : new Error("Unknown error occurred");
	}
}
