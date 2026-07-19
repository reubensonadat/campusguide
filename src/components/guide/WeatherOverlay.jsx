import { useState, useEffect, useRef } from 'react'
import { useCampus } from '@/context/CampusContext'

const WIND_THRESHOLD = 30

function getWeatherCategory(code, windSpeed) {
  if (windSpeed >= WIND_THRESHOLD) return 'windy'
  if (code === 0) return 'clear'
  if (code <= 3) return 'cloudy'
  if (code <= 48) return 'fog'
  if (code <= 57) return 'drizzle'
  if (code <= 67) return 'rain'
  if (code <= 77) return 'snow'
  if (code <= 82) return 'rain'
  return 'thunderstorm'
}

const LABELS = {
  clear: 'Sunny', cloudy: 'Cloudy', overcast: 'Overcast',
  fog: 'Foggy', drizzle: 'Rainy', rain: 'Raining',
  snow: 'Raining', thunderstorm: 'Storm', windy: 'Windy',
}

const EMOJIS = {
  sunny: '☀️', cloudy: '☁️', overcast: '☁️', foggy: '🌫️',
  rainy: '🌦️', raining: '🌧️', storm: '⛈️', windy: '💨',
}

const CAT_MAP = {
  clear: 'sunny', cloudy: 'cloudy', overcast: 'overcast',
  fog: 'foggy', drizzle: 'rainy', rain: 'raining',
  snow: 'raining', thunderstorm: 'storm', windy: 'windy',
}

function WeatherIcon({ cat }) {
  return (
    <span className="absolute top-1 right-0.5 text-[40px] leading-none select-none pointer-events-none opacity-80">
      {EMOJIS[CAT_MAP[cat]] || '☀️'}
    </span>
  )
}

export default function WeatherOverlay({ className }) {
  const { selectedCampus } = useCampus()
  const lat = selectedCampus?.coordinates?.lat
  const lng = selectedCampus?.coordinates?.lng
  const [weather, setWeather] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
    )
      .then(r => r.json())
      .then(data => { if (!cancelled && data?.current) setWeather(data.current) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [lat, lng])

  if (!weather) return null

  const cat = getWeatherCategory(weather.weather_code, weather.wind_speed_10m)
  const label = LABELS[cat] || 'Clear'
  const temp = Math.round(weather.temperature_2m)
  const tag = selectedCampus?.shortName || selectedCampus?.name || ''

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    el.style.transform = `perspective(400px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg) scale3d(1.02, 1.02, 1.02)`
    el.style.boxShadow = `${-dx * 4}px ${-dy * 4}px 12px rgba(0,0,0,0.15)`
  }

  const handleMouseLeave = (e) => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease-out'
    el.style.transform = ''
    el.style.boxShadow = ''
  }

  return (
    <div className={`pointer-events-auto ${className || ''}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[140px] h-[67px] rounded-xl shadow-lg overflow-hidden cursor-default"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 342 175" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="weather-card-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#002F45" />
              <stop offset="100%" stopColor="rgb(var(--primary-600))" />
            </linearGradient>
          </defs>
          <path
            fill="url(#weather-card-bg)"
            d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          />
        </svg>

        <WeatherIcon cat={cat} />

        <div className="relative z-10 h-full flex flex-col justify-between p-2">
          <div className="flex items-start">
            <span className="text-[20px] font-bold text-white leading-none tracking-tight">
              {temp}°
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold text-white/75">{tag}</span>
            <span className="text-[8px] font-medium text-white/50">{label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
