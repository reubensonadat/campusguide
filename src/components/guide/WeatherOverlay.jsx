import { useState, useEffect } from 'react'

const CAMPUS_LAT = 5.1158
const CAMPUS_LNG = -1.2908

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

export default function WeatherOverlay({ className }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${CAMPUS_LAT}&longitude=${CAMPUS_LNG}&current_weather=true&timezone=auto`
    )
      .then(r => r.json())
      .then(data => {
        if (!cancelled && data.current_weather) {
          setWeather(data.current_weather)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  if (!weather) return null

  const icon = WEATHER_ICONS[getWeatherCategory(weather.weathercode)] || '🌤️'

  return (
    <div className={className}>
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-slate-200/60">
        <span className="text-xl">{icon}</span>
        <div>
          <span className="text-sm font-bold text-slate-800">{Math.round(weather.temperature)}°C</span>
          <span className="text-[10px] font-medium text-slate-500 ml-2 uppercase tracking-wide">
            Cape Coast
          </span>
        </div>
      </div>
    </div>
  )
}
