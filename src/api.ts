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

export async function fetchRiderInsights(lat: number, lon: number): Promise<RiderInsights> {
    const [wRes, aRes, lRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=precipitation_probability&forecast_days=1`),
        fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`),
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    ]);

    if (!wRes.ok || !aRes.ok || !lRes.ok) {
        throw new Error('Failed to fetch one or more data sources');
    }

    const wData = await wRes.json();
    const aData = await aRes.json();
    const lData = await lRes.json();

    const currentHour = new Date().getHours();
    const rainProb = wData.hourly?.precipitation_probability?.[currentHour] || 0;

    const aqiVal = aData.current.us_aqi;
    let aqiLabel = "Good";
    if (aqiVal > 50) aqiLabel = "Fair";
    if (aqiVal > 100) aqiLabel = "Poor";
    if (aqiVal > 200) aqiLabel = "Dangerous";

    return {
        weather: {
            temp: Math.round(wData.current.temperature_2m),
            code: wData.current.weather_code,
            rainProb: rainProb
        },
        aqi: {
            value: aqiVal,
            label: aqiLabel
        },
        location: {
            city: lData.city || lData.locality || "Unknown Location"
        },
        lastUpdated: new Date().toISOString()
    };
}
