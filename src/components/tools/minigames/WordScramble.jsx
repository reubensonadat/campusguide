import React, { useState, useEffect } from 'react';
import { triggerHaptic } from '../../../utils/haptics';
import { RotateCcw } from 'lucide-react';

const WORDS = ["episodes","sunrise","facing","founder","targeted","passes","shoot","carol","pending","margin","directly","industry","intro","wearing","screen","mobility","profits","anymore","library","cited","bachelor","based","using","resolved","binary","server","human","signals","walls","strap","sought","valve","deficit","turkey","injury","chest","naughty","wales","famous","negative","writer","peaceful","untitled","douglas","horses","marathon","handling","symbol","liked","outer","donate","enemies","knife","epson","console","nerve","inner","warren","gratis","stable","handle","reveals","slots","genius","civic","highland","temple","lighter","shorter","dirty","bullet","lebanon","angle","thunder","buried","paying","remained","toward","fonts","assigned","occurred","affect","rainbow","opposed","cartoon","perform","samples","seventh","plugin","mystery","korea","wyoming","pregnant","outlined","honor","switches","numerous","phrases","title","business","katrina","poems","tunes","rugby","trainers","miami","stayed","mills","scene","infrared","media","saints","colored","tracks","shall","which","raymond","david","pictures","equally","privacy","consumer","msgid","knitting","cindy","pasta","honest","davis","hamburg","pubmed","rocks","offices","cliff","likewise","titans","trunk","cloudy","yields","raises","affected","crystal","knight","ballot","ranch","permits","notes","mercury","logical","wishlist","kingdom","number","health","musician","marie","crisis","sheriff","bright","labeled","treat","finland","reading","angola","muscles","public","address","thread","denmark","essence","agrees","become","banking","excerpt","level","pipes","arabia","palmer","boating","nigeria","addition","about","branches","beauty","risks","alien","sellers","proven","cable","wizard","dried","starring","juice","south","kennedy","herself","cameroon","brutal","yeast","trend","romania","inform","checkout","spoke","cycling","bowling","patrol","thumb","highs","somebody","sales","dallas","topics","client","broke","navigate","meals","virgin","tions","elder","anderson","promise","framed","letter","audio","billy","propose","tactics","managed","educated","might","fortune","speed","escape","tramadol","printed","fewer","message","research","detected","spent","breath","miles","bulgaria","assault","judicial","electro","soonest","future","boulder","emails","office","receives","allan","feels","minority","parts","experts","craig","daily","close","porsche","stress","female","weird","waves","tickets","phone","streets","adobe","length","headline","mixed","papua","locked","brand","python","heading","rewards","browsers","medicare","believe","coupons","right","facial","change","organic","schema","circle","complete","zambia","tagged","choices","directed","wrapping","digital","strips","stranger","webcam","reuters","speaking","trials","saved","suitable","students","yahoo","sunday","encoding","activity","parker","petite","light","beneath","ladies","emerging","walked","among","racial","config","bahrain","durable","groups","antibody","jenny","pontiac","decades","frost","manuals","paint","values","videos","profiles","largely","followed","advisors","farmer","coding","cooking","councils","finish","energy","diverse","assets","weddings","declared","puerto","delivery","theft","volume","involve","manga","gallery","learning","flyer","large","chevy","zoning","trembl","header","parks","wallet","skating","every","steering","tonight","analysis","pressed","posts","engines","fruit","pixels","giant","lights","robert","boats","oldest","opposite","being","fotos","treating","member","suicide","suddenly","drilling","athletes","distinct","evaluate","align","files","paraguay","appeared","coupled","hunger","picking","reason","fixtures","stack","court","twice","sunset","brochure","annie","patrick","tracking","realm","foods","combine","enter","regarded","nickel","soccer","nebraska","within","regional","homepage","citizen","baghdad","coming","amber","asset","patches","sharing","surplus","includes","walnut","conflict","issues","strongly","articles","endorsed","latino","decimal","packard","blues","mining","books","divide","claimed","rendered","retired","charlie","lanes","beads","mentor","packs","lenses","paxil","joyce","norman","needs","tomatoes","thats","cingular","handheld","priced","humanity","deadly","offset","circuit","arrival","gospel","dental","tattoo","turns","mumbai","delay","culture","obtain","stays","andorra","hansen","mailto","until","stuff","typical","devil","freeware","lesbians","credit","events","sonic","metres","images","vietnam","islands","badge","steam","release","lance","maine","enables","bearing","tsunami","prospect","roster","brush","blake","seats","money","novelty","power","purpose"];

export const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [error, setError] = useState(false);

  const pickWord = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    let scrambledWord = word;
    // Simple scramble
    while (scrambledWord === word) {
      scrambledWord = word.split('').sort(() => 0.5 - Math.random()).join('');
    }
    setCurrentWord(word);
    setScrambled(scrambledWord);
    setGuess('');
    setIsWon(false);
    setError(false);
  };

  useEffect(() => {
    pickWord();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setIsWon(true);
      setScore(s => s + 1);
      triggerHaptic('heavy');
      setTimeout(pickWord, 1500);
    } else {
      setError(true);
      triggerHaptic('light');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-6 items-center">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner">
          Score: <span className="text-primary-400">{score}</span>
        </span>
        <button 
          onClick={() => { setScore(0); pickWord(); }} 
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 text-white"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="mb-8 text-center min-h-[3rem]">
        {isWon ? (
          <span className="text-2xl font-black uppercase tracking-widest text-emerald-400 animate-in zoom-in spin-in-12 duration-300">
            CORRECT! 🎉
          </span>
        ) : (
          <span className="text-4xl font-black uppercase tracking-[0.3em] text-white/90 drop-shadow-lg">
            {scrambled}
          </span>
        )}
      </div>

      <form onSubmit={handleGuess} className="w-full max-w-[280px] flex flex-col gap-4">
        <input 
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess..."
          disabled={isWon}
          className={`w-full bg-black/20 border-2 rounded-2xl p-4 text-center text-xl font-bold text-white placeholder:text-white/30 focus:outline-none focus:bg-black/30 transition-all ${error ? 'border-rose-500 animate-pulse' : 'border-white/10 focus:border-primary-500/50'}`}
        />
        <button 
          type="submit"
          disabled={isWon || !guess.trim()}
          className="w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          SUBMIT
        </button>
      </form>

      <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-8 text-center">
        Unscramble the letters to find the word
      </p>
    </div>
  );
};
