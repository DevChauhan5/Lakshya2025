import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
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
    console.log("Enter button clicked"); // Debug log
    setShowPreloader(false); // First set this to ensure UI updates

    // Then try to play audio
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Audio playback error:", error);
          // Continue with navigation even if audio fails
        });
    }
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
          <PreLoader onEnter={handleEnter} />
        ) : (
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
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
