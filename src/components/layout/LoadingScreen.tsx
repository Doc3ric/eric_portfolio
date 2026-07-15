"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site.config";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 30);

    // Hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-8 flex flex-col items-center gap-4"
          >
            {/* Gradient logo badge */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-2xl font-bold text-white shadow-2xl shadow-brand-purple/20">
              EA
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xl font-semibold tracking-tight"
            >
              {siteConfig.name}
            </motion.h1>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              Loading portfolio...
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-48 overflow-hidden rounded-full bg-border"
            style={{ height: "2px" }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
