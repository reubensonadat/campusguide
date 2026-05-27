import React from 'react';

export const renderWeatherSvg = (type, size = 14, className = '') => {
  const props = { width: size, height: size, className, viewBox: '0 0 256 256', fill: 'currentColor' };
  switch (type) {
    case 'sunny':
      return <svg {...props}><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>;
    case 'cloudy':
      return <svg {...props}><path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z"/></svg>;
    case 'rainy':
      return <svg {...props}><path d="M158.66,196.44l-32,48a8,8,0,1,1-13.32-8.88l32-48a8,8,0,0,1,13.32,8.88ZM232,92a76.08,76.08,0,0,1-76,76H132.28l-29.62,44.44a8,8,0,1,1-13.32-8.88L113.05,168H76A52,52,0,0,1,76,64a53.26,53.26,0,0,1,8.92.76A76.08,76.08,0,0,1,232,92Zm-16,0A60.06,60.06,0,0,0,96,88.46a8,8,0,0,1-16-.92q.21-3.66.77-7.23A38.11,38.11,0,0,0,76,80a36,36,0,0,0,0,72h80A60.07,60.07,0,0,0,216,92Z"/></svg>;
    case 'cloudy-sun':
      return <svg {...props}><path d="M164,72a76.2,76.2,0,0,0-20.26,2.73,55.63,55.63,0,0,0-9.41-11.54l9.51-13.57a8,8,0,1,0-13.11-9.18L121.22,54A55.9,55.9,0,0,0,96,48c-.58,0-1.16,0-1.74,0L91.37,31.71a8,8,0,1,0-15.75,2.77L78.5,50.82A56.1,56.1,0,0,0,55.23,65.67L41.61,56.14a8,8,0,1,0-9.17,13.11L46,78.77A55.55,55.55,0,0,0,40,104c0,.57,0,1.15,0,1.72L23.71,108.6a8,8,0,0,0,1.38,15.88,8.24,8.24,0,0,0,1.39-.12l16.32-2.88a55.74,55.74,0,0,0,5.86,12.42A52,52,0,0,0,84,224h80a76,76,0,0,0,0-152ZM56,104a40,40,0,0,1,72.54-23.24,76.26,76.26,0,0,0-35.62,40,52.14,52.14,0,0,0-31,4.17A40,40,0,0,1,56,104ZM164,208H84a36,36,0,1,1,4.78-71.69c-.37,2.37-.63,4.79-.77,7.23a8,8,0,0,0,16,.92,58.91,58.91,0,0,1,1.88-11.81c0-.16.09-.32.12-.48A60.06,60.06,0,1,1,164,208Z"/></svg>;
    default:
      return <svg {...props}><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>;
  }
};

export const getWeatherIconAndAdvice = (code, temp) => {
  if (temp > 32) return { svgType: 'sunny', color: 'text-orange-500', bg: 'bg-orange-500/10', advice: 'Very hot today. Walk in the shade!' };
  if (temp < 22) return { svgType: 'cloudy', color: 'text-blue-500', bg: 'bg-blue-500/10', advice: 'Cool weather today.' };
  
  if (code === 0) return { svgType: 'sunny', color: 'text-yellow-500', bg: 'bg-yellow-500/10', advice: 'Clear skies. Perfect for walking.' };
  if (code >= 1 && code <= 3) return { svgType: 'cloudy-sun', color: 'text-slate-500', bg: 'bg-slate-500/10', advice: 'Partly cloudy. Good walking weather.' };
  if (code >= 45 && code <= 48) return { svgType: 'cloudy', color: 'text-slate-400', bg: 'bg-slate-400/10', advice: 'Foggy morning.' };
  if (code >= 51 && code <= 55) return { svgType: 'rainy', color: 'text-blue-400', bg: 'bg-blue-400/10', advice: 'Drizzling. Might want a light jacket.' };
  if (code >= 61 && code <= 82) return { svgType: 'rainy', color: 'text-blue-600', bg: 'bg-blue-600/10', advice: 'Raining. Grab an umbrella!' };
  if (code >= 95) return { svgType: 'rainy', color: 'text-purple-600', bg: 'bg-purple-600/10', advice: 'Thunderstorms. Seek shelter!' };
  
  return { svgType: 'sunny', color: 'text-yellow-500', bg: 'bg-yellow-500/10', advice: 'Beautiful day on campus.' };
};

export const WeatherWidget = ({ weatherData }) => {
  if (!weatherData) return null;
  const { svgType, color, bg, advice } = getWeatherIconAndAdvice(weatherData.weathercode, weatherData.temperature);
  
  return (
    <div className="flex items-center gap-2 bg-[#002F45]/50 backdrop-blur-md border border-[#6EABC6]/20 px-3 py-1.5 rounded-2xl shadow-sm">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-white/10`}>
        {renderWeatherSvg(svgType, 14, 'text-[#6EABC6]')}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-xs">{weatherData.temperature}°C</span>
        <span className="text-[#6EABC6] text-[10px] font-medium leading-none">{advice}</span>
      </div>
    </div>
  );
};
