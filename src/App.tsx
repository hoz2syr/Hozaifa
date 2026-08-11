import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const IMAGES = {
  coverCorner: 'https://static.tildacdn.net/tild6233-6433-4662-a437-316665346637/Gemini_Generated_Ima.png',
  sealCenter: 'https://static.tildacdn.net/tild6364-3438-4161-b964-613234643831/623915249_2629494717.png',
  sealButton: 'https://static.tildacdn.net/tild3366-6538-4432-b138-323436663963/623915249_2629494717.png',
  lineFlower: 'https://static.tildacdn.net/tild6566-6361-4436-a235-323435366264/line_flower_1.png',
  videoIntro: 'https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/Luxury_illustration_with_atmosph%E2%80%A6_202605232035%20(1).mp4',
  frameArabic: 'https://static.tildacdn.net/tild6634-6438-4366-b831-343330323762/frsame_1.png',
  floralCorner: 'https://static.tildacdn.net/tild6131-6532-4465-a338-653839313434/Group_204_2.png',
  goldSeal: 'https://static.tildacdn.net/tild3830-3661-4865-a130-306631633264/Vector.png',
  lineDivider: 'https://static.tildacdn.net/tild6239-3062-4232-a662-393266616664/line-divider2.png',
  timelineDot: 'https://static.tildacdn.net/tild6335-6235-4431-a638-396563386331/Decoration_elements_.png',
  flowerDecor: 'https://static.tildacdn.net/tild6363-6164-4231-a362-383563623535/flower-decor.png',
  locationIcon: 'https://static.tildacdn.net/tild3263-3561-4339-a533-643564366236/ic_baseline-place_1.png',
  mapFrame: 'https://static.tildacdn.net/tild6666-3763-4439-a131-303039386132/Group_222.png',
  dressCodePeople: 'https://static.tildacdn.net/tild3736-6638-4539-b133-393334313761/People_in_elegant_at.png',
  footerBg: 'https://static.tildacdn.net/tild3661-6433-4036-a330-323937363764/Create_PNG_image_cha.png',
  footerFlower: 'https://static.tildacdn.net/tild6166-3862-4533-b931-323630393862/Fine-line_flowers_Mo.png',
  footerLine: 'https://static.tildacdn.net/tild3766-3833-4138-b137-393561366461/decor-line_1.png',
  globalBgVideo: 'https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/Untitled%20Project.mp4',
  audioSrc: 'https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/%D9%85%D8%BA%D8%B1%D9%85%20-%20Moghram%20(Guitar%20Cover)%20_%20Johny%20Abu%20Nassar%20%5Bz_RC48DJbU0%5D%20(1).mp3'
};

// --- Custom Hooks ---
const useCountdown = (targetDate: Date) => {
  const countDownDate = targetDate.getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => setCountDown(countDownDate - new Date().getTime()), 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  if (countDown < 0) return [0, 0, 0, 0];
  return [
    Math.floor(countDown / (1000 * 60 * 60 * 24)),
    Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)),
    Math.floor((countDown % (1000 * 60)) / 1000)
  ];
};

// --- Components ---

function CoverScreen({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 1, y: 0 }}
      animate={isOpening ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#f9e6d4] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Corner Flowers */}
      <motion.img animate={isOpening ? { x: -200, y: -200, opacity: 0 } : {}} transition={{duration: 1.5}} src={IMAGES.coverCorner} className="absolute -top-32 -left-32 w-80 h-80 object-cover rotate-90" />
      <motion.img animate={isOpening ? { x: 200, y: -200, opacity: 0 } : {}} transition={{duration: 1.5}} src={IMAGES.coverCorner} className="absolute -top-32 -right-32 w-80 h-80 object-cover rotate-180" />
      <motion.img animate={isOpening ? { x: -200, y: 200, opacity: 0 } : {}} transition={{duration: 1.5}} src={IMAGES.coverCorner} className="absolute -bottom-32 -left-32 w-80 h-80 object-cover rotate-0" />
      <motion.img animate={isOpening ? { x: 200, y: 200, opacity: 0 } : {}} transition={{duration: 1.5}} src={IMAGES.coverCorner} className="absolute -bottom-32 -right-32 w-80 h-80 object-cover -rotate-90" />
      
      {/* Center Image */}
      <motion.img 
        animate={isOpening ? { y: -200, opacity: 0 } : {}} transition={{duration: 1.5}}
        src={IMAGES.sealCenter} className="w-[80vw] max-w-sm absolute -top-10" 
      />

      {/* Interactive Seal */}
      <motion.button 
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpening ? { scale: 1.5, opacity: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center mt-32 cursor-pointer outline-none"
      >
        <img src={IMAGES.sealButton} alt="Open Invitation" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl" />
        <span className="mt-8 text-[#866739] text-xl font-semibold tracking-widest uppercase font-amiri" dir="rtl">
          اضغط للفتح
        </span>
        <img src={IMAGES.lineFlower} className="w-32 mt-4" alt="decor" />
      </motion.button>
    </motion.div>
  );
}

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Main Application ---
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => console.log('Audio autoplay prevented'));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const [days, hours, minutes, seconds] = useCountdown(new Date(2026, 7, 21, 19, 30, 0)); // August 21, 2026
  const [rsvpState, setRsvpState] = useState<'idle'|'done'>('idle');
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('2');
  const [rsvpPresence, setRsvpPresence] = useState<'yes'|'no'>('yes');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  const submitRsvp = async () => {
    if (rsvpSubmitting) return;
    // تحقق يدوي من الحقول
    if (!rsvpName.trim()) {
      setRsvpError('يرجى كتابة الاسم الكريم أولاً.');
      return;
    }
    const guestCount = Number(rsvpGuests);
    if (!Number.isInteger(guestCount) || guestCount < 0 || guestCount > 10) {
      setRsvpError('يرجى إدخال عدد مرافقين صحيح (0 - 10).');
      return;
    }
    setRsvpError('');
    setRsvpSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvpName,
          guests: guestCount,
          presence: rsvpPresence,
        }),
      });
      if (!res.ok) throw new Error('submit failed');
      setRsvpState('done');
    } catch {
      setRsvpError('تعذر إرسال الرد حالياً، حاول مرة أخرى.');
    } finally {
      setRsvpSubmitting(false);
    }
  };

  // يُستدعى عند إرسال النموذج (مثلاً بزر Enter) — يمنع إعادة تحميل الصفحة
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitRsvp();
  };

  return (
    <div className="relative min-h-screen bg-[#f9e6d4] text-[#2a2a2a] overflow-x-hidden selection:bg-[#866739] selection:text-white">
      
      {/* Audio Setup */}
      <audio ref={audioRef} src={IMAGES.audioSrc} loop playsInline />

      <AnimatePresence>
        {!isOpen && <CoverScreen onOpen={handleOpen} />}
      </AnimatePresence>

      {/* Global Fixed Video Background */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-30">
        <video src={IMAGES.globalBgVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>

      {/* Audio Control */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#747B54] rounded-full flex items-center justify-center text-white shadow-xl hover:bg-[#60603b] transition-colors"
            onClick={toggleAudio}
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- Main Content (Scrollable) --- */}
      {isOpen && (
        <main className="relative z-10 w-full max-w-[480px] mx-auto bg-[#f9e6d4] shadow-2xl flex flex-col items-center">
          
          {/* Section 1: Intro */}
          <section className="relative w-full h-[800px] flex flex-col items-center justify-center overflow-hidden">
            <video src={IMAGES.videoIntro} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f9e6d4] via-transparent to-transparent h-full" />
            
            <div className="relative z-10 flex flex-col items-center mt-32 text-center">
              <FadeUp>
                <h1 className="font-amiri leading-tight flex flex-col items-center" dir="rtl">
                  <span className="flex flex-col items-center gap-2 drop-shadow-md">
                    <span className="text-xl md:text-2xl text-[#454545]">المهندس</span>
                    <span className="text-4xl md:text-5xl font-bold text-[#866739]">حذيفة أيمن سيد سليمان</span>
                  </span>
                  <span className="text-3xl my-4 text-[#866739] drop-shadow-md">و</span>
                  <span className="flex flex-col items-center gap-2 drop-shadow-md">
                    <span className="text-xl md:text-2xl text-[#454545]">الدكتورة</span>
                    <span className="text-4xl md:text-5xl font-bold text-[#866739]">زهراء محمد عيد خشفة</span>
                  </span>
                </h1>
              </FadeUp>
              
              <FadeUp delay={0.4}>
                <div className="mt-12 text-[#866739] text-xl font-semibold tracking-widest uppercase" dir="rtl">
                  <p>الجمعة 21 أغسطس 2026</p>
                  <p className="mt-2 text-lg">السابعة والنصف مساءً</p>
                </div>
              </FadeUp>
            </div>
          </section>

          {/* Section 2: Arabic Invitation */}
          <section className="w-full relative py-20 px-8 flex flex-col items-center justify-center text-center">
            <FadeUp>
              <img src={IMAGES.floralCorner} alt="decor" className="w-48 mb-8" />
            </FadeUp>
            
            <div className="relative w-full max-w-[350px] py-16 px-6">
              {/* Frame border */}
              <img src={IMAGES.frameArabic} alt="frame" className="absolute inset-0 w-full h-full object-fill opacity-80" />
              
              <FadeUp delay={0.2}>
                <div className="relative z-10 font-amiri text-[#454545] leading-relaxed px-4 py-12 font-bold flex flex-col justify-center min-h-[250px] text-center" dir="rtl">
                  <p className="text-2xl md:text-3xl leading-[2.2] text-[#866739]">
                    ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <motion.img 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  src={IMAGES.goldSeal} 
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-12" 
                />
              </FadeUp>
            </div>

            <FadeUp delay={0.6}>
              <div className="mt-12 text-[#876836] text-3xl"></div>
              <img src={IMAGES.lineFlower} className="w-40 mx-auto mt-6" alt="decor" />
            </FadeUp>
          </section>

          {/* Section 3: Countdown */}
          <section className="w-full py-16 flex flex-col items-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl text-[#866739] text-center mb-4 font-amiri font-bold" dir="rtl">يتبقى على الفرحة</h2>
              <img src={IMAGES.lineDivider} className="w-32 mx-auto mb-10 opacity-70" alt="divider" />
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex items-center gap-2 md:gap-4 font-ovo text-[#866739] flex-row-reverse" dir="ltr">
                {[
                  { v: days, l: 'يوم' },
                  { v: hours, l: 'ساعة' },
                  { v: minutes, l: 'دقيقة' },
                  { v: seconds, l: 'ثانية' }
                ].map((t, i) => (
                  <React.Fragment key={t.l}>
                    <div className="flex flex-col items-center w-16 md:w-20 font-amiri">
                      <span className="text-4xl md:text-5xl font-bold">{String(t.v).padStart(2, '0')}</span>
                      <span className="text-lg mt-2 font-bold">{t.l}</span>
                    </div>
                    {i < 3 && <span className="text-4xl -mt-6 opacity-60 font-amiri">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </FadeUp>
          </section>

          {/* Section 5: Location Details */}
          <section className="w-full py-16 flex flex-col items-center px-4 font-amiri" dir="rtl">
            <FadeUp>
              <h2 className="text-4xl text-[#866739] text-center mb-4 font-bold">موقع الحفل</h2>
              <img src={IMAGES.lineDivider} className="w-32 mx-auto mb-8 opacity-70" alt="divider" />
            </FadeUp>

            <FadeUp delay={0.2}>
              <motion.img 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                src={IMAGES.locationIcon} 
                className="w-8 mb-6" alt="pin" 
              />
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="text-center text-[#454545] space-y-2 mb-10 font-bold">
                <p className="text-3xl text-[#866739] font-bold">صالة الرؤية</p>
                <p className="text-2xl text-[#454545]">داريا - شارع الرؤية</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.6}>
              <div className="relative w-full max-w-[360px] mx-auto p-4 flex flex-col items-center">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('صالة الرؤية داريا')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full max-w-[335px] bg-[#747B54] hover:bg-[#60603b] text-white py-3 px-6 rounded-2xl font-amiri text-xl font-bold text-center shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <img src={IMAGES.locationIcon} className="w-5 h-5 invert" alt="map pin" />
                  <span>فتح الموقع في الخرائط</span>
                </a>
              </div>
            </FadeUp>
          </section>

          {/* Section 7: Map Route */}
          <section className="w-full py-16 flex flex-col items-center font-amiri" dir="rtl">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl text-[#866739] text-center mb-4 px-4 font-bold">موقع القاعة على الخريطة</h2>
              <img src={IMAGES.lineDivider} className="w-32 mx-auto mb-12 opacity-70" alt="divider" />
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="w-full px-6 flex flex-col items-center gap-4">
                <iframe 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('داريا صالة الرؤية')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full max-w-[335px] h-[335px] border-0 rounded-2xl shadow-lg"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع صالة الرؤية - داريا"
                ></iframe>
              </div>
            </FadeUp>
          </section>

          {/* Section 8: RSVP */}
          <section className="w-full py-16 flex flex-col items-center px-6 font-amiri" dir="rtl">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl text-[#866739] text-center mb-4 font-bold">تأكيد الحضور</h2>
              <img src={IMAGES.lineDivider} className="w-32 mx-auto mb-10 opacity-70" alt="divider" />
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="w-full max-w-[340px]">
                {rsvpState === 'done' ? (
                  <div className="text-center py-10 px-6 border border-[#ac9778] rounded-xl bg-white/20 backdrop-blur-sm">
                    <p className="text-3xl text-[#866739] font-amiri mb-2 font-bold">شكراً لكم!</p>
                    <p className="text-[#2a2a2a] text-xl font-bold">تم تسجيل ردكم بنجاح.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-6 font-bold">
                    <div>
                      <label className="block text-[#2a2a2a] text-xl mb-2">الاسم الكريم</label>
                      <input required type="text" value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} className="w-full bg-transparent border-b border-[#ac9778] py-2 text-[#2a2a2a] outline-none focus:border-[#866739] transition-colors font-amiri text-lg" placeholder="الاسم الثلاثي" />
                    </div>
                    <div>
                      <label className="block text-[#2a2a2a] text-xl mb-2">عدد المرافقين</label>
                      <input required type="number" min="0" max="10" value={rsvpGuests} onChange={(e) => setRsvpGuests(e.target.value)} className="w-full bg-transparent border-b border-[#ac9778] py-2 text-[#2a2a2a] outline-none focus:border-[#866739] transition-colors font-amiri text-lg" placeholder="مثال: 0 أو ٢" />
                    </div>
                    <div>
                      <label className="block text-[#2a2a2a] text-xl mb-4">هل ستحضر؟</label>
                      <div className="flex flex-col gap-3 font-amiri text-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="presence" value="yes" checked={rsvpPresence === 'yes'} onChange={() => setRsvpPresence('yes')} required className="w-5 h-5 accent-[#866739]" />
                          <span>نعم، سأحضر بكل سرور</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="presence" value="no" checked={rsvpPresence === 'no'} onChange={() => setRsvpPresence('no')} className="w-5 h-5 accent-[#866739]" />
                          <span>أعتذر عن الحضور</span>
                        </label>
                      </div>
                    </div>
                    {rsvpError && <p className="text-red-700 text-center font-bold">{rsvpError}</p>}
                    <button type="button" onClick={() => void submitRsvp()} disabled={rsvpSubmitting} className="mt-4 w-48 mx-auto bg-[#747B54] hover:bg-[#60603b] text-white py-3 px-6 rounded-md font-amiri tracking-widest text-lg uppercase transition-colors shadow-md font-bold disabled:opacity-60">
                      {rsvpSubmitting ? 'جارٍ الإرسال...' : 'تأكيد الرد'}
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>
          </section>

          {/* Section 9: Footer */}
          <section className="w-full py-20 flex flex-col items-center text-center relative overflow-hidden font-amiri" dir="rtl">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl text-[#866739] mb-12 font-bold">بانتظاركم لتكتمل فرحتنا</h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <img src={IMAGES.footerBg} className="w-[200px] mb-8" alt="decor" />
            </FadeUp>

            <FadeUp delay={0.4}>
              <img src={IMAGES.footerFlower} className="w-[50px] mb-6 opacity-80" alt="flower" />
            </FadeUp>

            <FadeUp delay={0.6}>
              <img src={IMAGES.footerLine} className="w-[160px] opacity-70" alt="line" />
            </FadeUp>
          </section>

        </main>
      )}
    </div>
  );
}
