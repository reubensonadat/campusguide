import { useState, useEffect } from 'react'
import { useCampus } from '@/context/CampusContext'

const WEATHER_ICONS = {
  clear: '☀️', cloudy: '☁️', overcast: '☁️', fog: '🌫️',
  drizzle: '🌦️', rain: '🌧️', snow: '❄️', thunderstorm: '⛈️',
}

function getWeatherCategory(code) {
  if (code === 0) return 'clear'
  if (code <= 3) return 'cloudy'
  if (code <= 48) return 'fog'
  if (code <= 57) return 'drizzle'
  if (code <= 67) return 'rain'
  if (code <= 77) return 'snow'
  if (code <= 82) return 'rain'
  return 'thunderstorm'
}

export default function WeatherOverlay({ className, showLegend, legendColors }) {
  const { selectedCampus } = useCampus()
  const lat = selectedCampus?.coordinates?.lat
  const lng = selectedCampus?.coordinates?.lng
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`
    )
      .then(r => r.json())
      .then(data => { if (!cancelled && data?.current_weather) setWeather(data.current_weather) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [lat, lng])

  if (!weather) return null

  const icon = WEATHER_ICONS[getWeatherCategory(weather.weathercode)] || '🌤️'
  const temp = Math.round(weather.temperature)

  return (
    <div className={`pointer-events-none select-none ${className || ''}`}>
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white/90 drop-shadow-sm">
        <span className="text-lg">{icon}</span>
        <span>{temp}°C</span>
      </div>
    </div>
  )
}
