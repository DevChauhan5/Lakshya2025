import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import PageBackground from "./components/layout/PageBackground";
import SmoothScroll from "./components/providers/SmoothScroll";
import About from "./components/sections/About";
import Events from "./components/sections/Events";
import Gallery from "./components/sections/Gallery";
import Hero from "./components/sections/Hero";
import OurTeam from "./components/sections/OurTeam";
import Sponsors from "./components/sections/Sponsors";
import Timeline from "./components/sections/Timeline";
import PreLoader from "./components/PreLoader";
import SoundControl from "./components/SoundControl";

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnter = () => {
    setTimeout(() => {
      setShowPreloader(false);
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    }, 800);
  };

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/bgm.webm" type="audio/webm" />
      </audio>

      {!showPreloader && (
        <SoundControl isPlaying={isPlaying} onToggle={toggleSound} />
      )}

      <AnimatePresence mode="wait">
        {showPreloader ? (
          <PreLoader onEnter={handleEnter} key="preloader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <SmoothScroll>
              <main className="relative min-h-screen overflow-x-hidden">
                <PageBackground />
                <div className="relative z-10">
                  <Navbar />
                  <Hero />
                  <About />
                  <Timeline />
                  <Events />
                  <Gallery />
                  <Sponsors />
                  <OurTeam />
                  <Footer />
                </div>
              </main>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
