"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Import X icon
import { useEffect } from "react";

const committeeData = [
  {
    committee: "Sponsorship & Vendorship",
    members: [
      "Shourya Mehra",
      "Vanshaj Pradhan",
      "Aman Krishna",
      "Riddhi Khunteta",
      "Somya Yadav",
    ],
  },
  {
    committee: "Media & Promotion",
    members: [
      "Qamar Raza",
      "Krish Kumawat",
      "Mouli Pandey",
      "Vartika Yadav",
      "Yuvraj Singh",
      "Kapil Saini",
      "Divyansh Dudhani",
    ],
  },
  {
    committee: "Creative Design",
    members: [
      "Navya Bhatt",
      "Kanishk Purohit",
      "Arifa Khan",
      "Vaibhav Vashishtha",
      "Sakshi Singh",
      "Sani Jain",
      "Yug Pathak",
    ],
  },
  {
    committee: "Documentation",
    members: ["Bhuwan Chhabra", "Bhelitriveda", "Agni Goswami"],
  },
  {
    committee: "Logistics",
    members: ["Anirudh Sharma", "Aditya Raj Singh Tanwar", "Saksham Verma"],
  },
  {
    committee: "Technical",
    members: ["Abhay Parmar", "Tushar Jangid"],
  },
  {
    committee: "Stage Operations",
    members: ["Pulkit Jain", "Tisha Oberoi", "Uma Todi"],
  },
  {
    committee: "Marketing & Branding",
    members: ["Karan Singh", "Mayank Khatri"],
  },
  {
    committee: "Anchoring",
    members: ["Akshara Choudhary", "Nikhil Indoria"],
  },
  {
    committee: "Food & Accommodation",
    members: ["Dhriti Arora", "Uttkarsh Singh"],
  },
  {
    committee: "Cultural",
    members: [
      "Sharma Aryan Dinesh",
      "Thrishanth Kumar S.",
      "Lavya Lalwani",
      "Sparsh Goyal",
      "Alpita Singh",
      "Suhani Agarwal",
    ],
  },
  {
    committee: "Edufun",
    members: [
      "Suhani Sharma",
      "Vishesh Panwar",
      "Lekhanshi Jhedu",
      "Farhaan Mansoori",
      "Yuvraj Singh Chouhan",
      "Jahanvi Sharma",
      "Kangna Kriplani",
      "Amrita Soni",
    ],
  },
  {
    committee: "Sports",
    members: [
      "Prayag Vyas",
      "Raman Singh",
      "Pranjal Yadav",
      "Bhavesh Khandelwal",
      "Devansu Singh",
      "Rishabh Tater",
    ],
  },
  {
    committee: "E-Sports",
    members: ["Lakshya Tikkiwal", "Garv Verma"],
  },
];

export function CommitteeDialog({ open, onOpenChange }) {
  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  // Prevent scroll event propagation
  const handleScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onWheel={handleScroll}
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                  z-[201] w-[calc(100vw-2rem)] md:w-[95vw] max-w-5xl 
                  h-[calc(100vh-4rem)] bg-black/90 
                  border border-white/10 rounded-xl p-0
                  overflow-hidden" // Added overflow hidden
      >
        <DialogHeader
          className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm px-4 py-4 
                    sm:px-6 border-b border-white/10"
        >
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white text-center">
            Lakshya&apos;25 Committees
          </DialogTitle>

          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 p-2 rounded-lg
                     text-white/70 hover:text-white
                     bg-white/5 hover:bg-white/10
                     transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <ScrollArea
          className="flex-1 h-[calc(100vh-10rem)] w-full"
          type="always"
          scrollHideDelay={0}
        >
          <div className="p-4 sm:p-6 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {committeeData.map((committee, index) => (
                <motion.div
                  key={committee.committee}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.03, 0.3), // Cap maximum delay
                    duration: 0.3,
                  }}
                  className="rounded-xl bg-white/5 hover:bg-white/10 
                           backdrop-blur-sm p-4 sm:p-6 border border-white/10
                           transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-theme-primary mb-4">
                    {committee.committee}
                  </h3>
                  <div className="space-y-2">
                    {committee.members.map((member) => (
                      <div
                        key={member}
                        className="text-white/80 hover:text-white text-sm
                                 transition-colors duration-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-accent/50" />
                        {member}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
