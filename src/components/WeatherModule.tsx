import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, AlertCircle } from 'lucide-react';
import { useStore } from '../store';

const getWeatherInfo = (code: number | null) => {
    if (code === null) return { text: 'Loading...', icon: Sun, color: 'text-pulsar-blue' };

    // WMO Weather interpretation codes (WW)
    if (code === 0) return { text: 'Clear Sky', icon: Sun, color: 'text-amber-400' };
    if (code <= 3) return { text: 'Partly Cloudy', icon: Cloud, color: 'text-oled-gray-400' };
    if (code <= 48) return { text: 'Foggy', icon: Cloud, color: 'text-oled-gray-500' };
    if (code <= 55) return { text: 'Drizzle', icon: CloudRain, color: 'text-pulsar-blue' };
    if (code <= 65) return { text: 'Raining', icon: CloudRain, color: 'text-pulsar-blue' };
    if (code <= 77) return { text: 'Snowing', icon: CloudRain, color: 'text-white' };
    if (code <= 82) return { text: 'Rain Showers', icon: CloudRain, color: 'text-pulsar-blue' };
    return { text: 'Cloudy', icon: Cloud, color: 'text-oled-gray-400' };
};

export function WeatherModule() {
    const { weather, aqi } = useStore();
    const info = getWeatherInfo(weather.code);
    const Icon = info.icon;

    if (!weather.lastUpdated && !aqi.value) return (
        <div className="p-6 bg-oled-gray-50/50 rounded-2xl border border-white/5 animate-pulse flex items-center justify-center text-[10px] text-white/20 font-black uppercase tracking-widest">
            Acquiring weather data...
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
        >
            <section className="bg-oled-gray-50/50 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-pulsar-blue" /> Condition
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Icon className={`w-8 h-8 ${info.color}`} />
                    <div className="space-y-0.5">
                        <div className="text-lg font-black tracking-tight text-white leading-none">
                            {weather.temp}°<span className="text-[10px] opacity-30 ml-0.5">C</span>
                        </div>
                        <div className="text-[9px] font-bold text-oled-gray-400 uppercase tracking-tight truncate max-w-[80px]">
                            {info.text}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <CloudRain className="w-2.5 h-2.5 text-pulsar-blue/60" />
                        <span className="text-[9px] font-black text-white/40">{weather.rainProb}% <span className="text-[8px] opacity-50 ml-0.5">RAIN</span></span>
                    </div>
                </div>
            </section>

            <section className="bg-oled-gray-50/50 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-oled-gray-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-pulsar-blue" /> Air Quality
                    </span>
                    <div className={`px-1.5 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-widest ${aqi.label === 'Good' ? 'bg-emerald-500/20 text-emerald-500' :
                            aqi.label === 'Fair' ? 'bg-amber-500/20 text-amber-500' :
                                'bg-red-500/20 text-red-500 animate-pulse'
                        }`}>
                        {aqi.label}
                    </div>
                </div>

                <div className="text-3xl font-black tracking-tighter text-glow-pulsar mb-1">
                    {aqi.value}
                </div>
                <div className="text-[9px] font-bold text-oled-gray-400 uppercase tracking-widest">
                    US AQI INDEX
                </div>

                <div className="mt-3 overflow-hidden bg-white/5 rounded-full h-1 w-full">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (aqi.value || 0) / 2)}%` }}
                        className={`h-full rounded-full ${aqi.label === 'Good' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                                aqi.label === 'Fair' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' :
                                    'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                            }`}
                    />
                </div>
            </section>
        </motion.div>
    );
}
