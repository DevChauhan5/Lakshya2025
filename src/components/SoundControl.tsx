import { motion } from "framer-motion";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

interface SoundControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const SoundControl = ({ isPlaying, onToggle }: SoundControlProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-cosmic-accent/20 backdrop-blur-md border border-cosmic-accent/30 hover:bg-cosmic-accent/30 transition-all duration-300"
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <IoVolumeHigh className="w-6 h-6 text-cosmic-accent" />
      ) : (
        <IoVolumeMute className="w-6 h-6 text-cosmic-accent" />
      )}
    </motion.button>
  );
};

export default SoundControl;
