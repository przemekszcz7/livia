/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export const FishIcon = () => (
  <svg viewBox="0 0 100 50" className="w-12 h-6 fill-none stroke-current stroke-1 opacity-40">
    <path d="M10,25 C10,10 40,5 60,15 C80,25 90,25 95,20 L95,30 C90,25 80,25 60,35 C40,45 10,40 10,25 Z" />
    <path d="M10,25 L5,15 L5,35 Z" />
    <circle cx="75" cy="22" r="1.5" className="fill-current" />
  </svg>
);

export const AnchorIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 fill-none stroke-current stroke-2">
    <path d="M50,10 L50,80 M30,40 L70,40 M20,60 C20,85 80,85 80,60 M50,85 L50,95 M45,95 L55,95" />
    <circle cx="50" cy="15" r="5" />
  </svg>
);

export const HookIcon = () => (
  <svg viewBox="0 0 50 100" className="w-8 h-16 fill-none stroke-current stroke-2 opacity-30">
    <path d="M25,0 L25,70 C25,90 45,90 45,70 L40,75" />
  </svg>
);

export const SmokeWisp = ({ delay = 0 }) => (
  <motion.svg
    viewBox="0 0 20 60"
    className="w-4 h-12 fill-none stroke-white/20 stroke-1 will-change-transform"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: [0, 0.5, 0], y: -20, x: [0, 5, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
  >
    <path d="M10,60 C5,50 15,40 10,30 C5,20 15,10 10,0" />
  </motion.svg>
);

export const Seagull = ({ delay = 0 }) => (
  <motion.svg
    viewBox="0 0 40 20"
    className="w-8 h-4 fill-none stroke-current stroke-1 opacity-20 will-change-transform"
    initial={{ x: -100, y: 20 }}
    animate={{ x: 1200, y: [20, 10, 25, 15] }}
    transition={{ duration: 25, repeat: Infinity, delay }}
  >
    <path d="M5,15 C10,10 20,10 20,15 C20,10 30,10 35,15" />
  </motion.svg>
);

export const RopeDivider = () => (
  <div className="w-full h-4 flex items-center justify-center overflow-hidden">
    <div className="w-full h-[2px] border-t-2 border-dashed border-brown-light/40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-4">
        <div className="w-10 h-10 rounded-full border-2 border-brown-light/40 flex items-center justify-center rotate-45">
          <div className="w-8 h-8 rounded-full border border-dashed border-brown-light/40" />
        </div>
      </div>
    </div>
  </div>
);
