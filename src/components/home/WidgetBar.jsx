import React from 'react';
import { renderWeatherSvg, getWeatherIconAndAdvice } from './utils';
import { VerseSvgIcon, ForexSvgIcon, FootballSvgIcon, CryptoSvgIcon, NewsSvgIcon, QuoteSvgIcon, JokeSvgIcon, FunFactSvgIcon, GithubSvgIcon, WordSvgIcon } from './icons';

const WidgetCard = ({ id, icon: Icon, title, shortText, expandedContent, isExpanded, onToggle, single }) => {
  const expanded = isExpanded || single;
  return (
    <div
      onClick={() => { if (!single) onToggle(); }}
      className={`flex flex-col gap-2 bg-gray-900/50 backdrop-blur-md border border-primary-400/20 px-3 py-2 rounded-2xl shadow-sm self-start transition-all ${expanded ? 'w-full max-w-[280px]' : ''} ${!single ? 'cursor-pointer hover:bg-gray-900/70' : ''}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 shrink-0">
          {Icon}
        </div>
        {!expanded && shortText && (
          <span className="text-white font-bold text-xs truncate max-w-[100px]">{shortText}</span>
        )}
        {expanded && title && (
          <span className="text-white font-bold text-[10px] opacity-80 uppercase tracking-wider">{title}</span>
        )}
      </div>
      {expanded && (
        <div className="flex flex-col px-1 pb-1">{expandedContent}</div>
      )}
    </div>
  );
};

const WidgetBar = ({
  homeWidgets, weatherData, forexData, cryptoData, jokeData, factData,
  wordData, verseData, footballData, newsData, quoteData, githubData,
  expandedWidget, setExpandedWidget, isDeferredActive
}) => {
  const widgets = [];

  const addWidget = (id, size, props) => {
    widgets.push({
      id, size,
      content: (
        <WidgetCard
          key={id} id={id} {...props}
          isExpanded={expandedWidget === id}
          onToggle={() => setExpandedWidget(expandedWidget === id ? null : id)}
          single={widgets.length === 0}
        />
      )
    });
  };

  if (homeWidgets.weather && weatherData) {
    const { svgType, advice } = getWeatherIconAndAdvice(weatherData.weathercode, weatherData.temperature);
    addWidget('weather', 'small', {
      icon: renderWeatherSvg(svgType, 14, 'text-primary-400'),
      title: 'Weather',
      shortText: `${weatherData.temperature}°C`,
      expandedContent: (
        <>
          <span className="text-white font-bold text-lg">{weatherData.temperature}°C</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug">{advice}</span>
        </>
      )
    });
  }

  if (homeWidgets.forex && forexData) {
    addWidget('forex', 'small', {
      icon: <ForexSvgIcon size={14} className="text-primary-400" />,
      title: 'USD/GHS',
      shortText: `₵${forexData.toFixed(2)}`,
      expandedContent: (
        <>
          <span className="text-white font-bold text-lg">₵{forexData.toFixed(2)}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug">1 USD to GHS</span>
        </>
      )
    });
  }

  if (homeWidgets.crypto && cryptoData) {
    addWidget('crypto', 'small', {
      icon: <CryptoSvgIcon size={14} className="text-primary-400" />,
      title: 'Bitcoin',
      shortText: `$${cryptoData.toLocaleString()}`,
      expandedContent: (
        <>
          <span className="text-white font-bold text-lg">${cryptoData.toLocaleString()}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug">Current BTC Price (USD)</span>
        </>
      )
    });
  }

  if (homeWidgets.joke && jokeData) {
    addWidget('joke', 'small', {
      icon: <JokeSvgIcon size={14} className="text-primary-400" />,
      title: 'Dad Joke',
      shortText: 'Joke',
      expandedContent: <span className="text-primary-400 text-[11px] font-medium leading-snug">{jokeData}</span>
    });
  }

  if (homeWidgets.fact && factData) {
    addWidget('fact', 'small', {
      icon: <FunFactSvgIcon size={14} className="text-primary-400" />,
      title: 'Fun Fact',
      shortText: 'Fact',
      expandedContent: <span className="text-primary-400 text-[11px] font-medium leading-snug">{factData}</span>
    });
  }

  if (homeWidgets.word && wordData) {
    addWidget('word', 'small', {
      icon: <WordSvgIcon size={14} className="text-primary-400" />,
      title: 'Word of the Day',
      shortText: 'Word',
      expandedContent: (
        <>
          <span className="text-white font-bold text-sm capitalize">{wordData.word}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug mt-1">{wordData.meanings[0]?.definitions[0]?.definition}</span>
        </>
      )
    });
  }

  if (homeWidgets.verse && verseData) {
    addWidget('verse', 'medium', {
      icon: <VerseSvgIcon size={14} className="text-primary-400" />,
      title: 'Verse',
      shortText: `${verseData.bookname} ${verseData.chapter}`,
      expandedContent: (
        <>
          <span className="text-white font-bold text-[10px] tracking-wide uppercase">{verseData.bookname} {verseData.chapter}:{verseData.verse}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug italic mt-0.5">"{verseData.text}"</span>
        </>
      )
    });
  }

  if (homeWidgets.football && footballData) {
    addWidget('football', 'medium', {
      icon: <FootballSvgIcon size={14} className="text-primary-400" />,
      title: footballData.isLive ? '🔴 Live Score' : (footballData.isOffSeason ? 'Football Updates' : 'Latest Result'),
      shortText: footballData.isOffSeason ? 'No Active Matches' : `${footballData.homeScore} - ${footballData.awayScore}`,
      expandedContent: (
        <>
          <span className="text-white font-bold text-sm tracking-wide truncate">{footballData.isOffSeason ? 'No Active Matches' : `${footballData.home} vs ${footballData.away}`}</span>
          <span className="text-primary-400 text-[11px] font-bold leading-none mt-1">
            {footballData.isOffSeason ? 'Check back later' : `${footballData.homeScore} - ${footballData.awayScore}`}
            {!footballData.isOffSeason && <span className="font-medium opacity-80"> ({footballData.status})</span>}
          </span>
        </>
      )
    });
  }

  if (homeWidgets.news && newsData) {
    addWidget('news', 'medium', {
      icon: <NewsSvgIcon size={14} className="text-primary-400" />,
      title: 'Tech News',
      shortText: 'News',
      expandedContent: (
        <>
          <span className="text-white font-bold text-[10px] tracking-wide uppercase">{newsData.news_site}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug mt-0.5 line-clamp-2">{newsData.title}</span>
        </>
      )
    });
  }

  if (homeWidgets.quote && quoteData) {
    addWidget('quote', 'medium', {
      icon: <QuoteSvgIcon size={14} className="text-primary-400" />,
      title: 'Quote',
      shortText: 'Quote',
      expandedContent: (
        <>
          <span className="text-white font-bold text-[10px] tracking-wide uppercase">{quoteData.author}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-snug italic mt-0.5 line-clamp-2">"{quoteData.quote}"</span>
        </>
      )
    });
  }

  if (homeWidgets.github && githubData) {
    addWidget('github', 'medium', {
      icon: <GithubSvgIcon size={14} className="text-primary-400" />,
      title: 'GitHub Stats',
      shortText: 'GitHub',
      expandedContent: (
        <>
          <span className="text-white font-bold text-sm">@{githubData.login}</span>
          <span className="text-primary-400 text-[11px] font-medium leading-none mt-1">{githubData.followers} followers • {githubData.public_repos} repos</span>
        </>
      )
    });
  }

  widgets.sort((a, b) => {
    if (a.id === expandedWidget) return -1;
    if (b.id === expandedWidget) return 1;
    if (a.size === 'small' && b.size === 'medium') return -1;
    if (a.size === 'medium' && b.size === 'small') return 1;
    return 0;
  });

  if (!isDeferredActive) {
    return (
      <div className="flex gap-2 w-full items-start">
        <div className="h-[46px] bg-white/10 rounded-2xl animate-pulse w-20"></div>
        <div className="h-[46px] bg-white/10 rounded-2xl animate-pulse w-16"></div>
        <div className="h-[46px] bg-white/10 rounded-2xl animate-pulse w-16"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 w-full items-start">
      {widgets.map(w => w.content)}
    </div>
  );
};

export default WidgetBar;
