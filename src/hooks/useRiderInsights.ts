import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchRiderInsights, RiderInsights } from "../api";

export function useRiderInsights() {
	const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
		null,
	);
	const [geoError, setGeoError] = useState<string | null>(null);

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			setGeoError("Geolocation is not supported by your browser");
			return;
		}

		const timeout = setTimeout(() => {
			if (!coords && !geoError) {
				setGeoError("Location request timed out");
			}
		}, 10000);

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				clearTimeout(timeout);
				setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
			},
			(err) => {
				clearTimeout(timeout);
				setGeoError(
					err.code === 1 ? "Location access denied" : "Location unavailable",
				);
				console.warn("Geolocation Error:", err);
			},
			{ timeout: 8000 },
		);

		return () => clearTimeout(timeout);
	}, []);

	const query = useQuery<RiderInsights>({
		queryKey: ["rider-insights", coords?.lat, coords?.lon],
		queryFn: () => fetchRiderInsights(coords!.lat, coords!.lon),
		enabled: !!coords,
		staleTime: 1000 * 60 * 15, // 15 minutes
		refetchOnWindowFocus: false,
	});

	return {
		...query,
		geoError,
		isLocating: !coords && !geoError,
	};
}
