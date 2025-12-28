import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchRiderInsights, RiderInsights } from '../api';

export function useRiderInsights() {
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [geoError, setGeoError] = useState<string | null>(null);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setGeoError("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            },
            (err) => {
                setGeoError(err.message);
                console.warn("Geolocation denied or failed", err);
            }
        );
    }, []);

    const query = useQuery<RiderInsights>({
        queryKey: ['rider-insights', coords?.lat, coords?.lon],
        queryFn: () => fetchRiderInsights(coords!.lat, coords!.lon),
        enabled: !!coords,
        staleTime: 1000 * 60 * 15, // 15 minutes
        refetchOnWindowFocus: false,
    });

    return {
        ...query,
        geoError,
        isLocating: !coords && !geoError
    };
}
