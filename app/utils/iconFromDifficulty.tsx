import { Flame } from "lucide-react";
import { ReactElement } from 'react';

export default function iconFromDifficulty(difficulty: string): ReactElement {
  switch (difficulty) {
    case '1':
      return <Flame size={20} className="text-cyan-400" />; // Easy
    case '2':
      return <Flame size={20} color="#00ff40" />; // Medium
    case '3':
      return <Flame size={20} color="#ffff00" />; // Hard
    case '4':
      return <Flame size={20} color="#ff8000" />; // Very Hard
    case '5':
      return <Flame size={20} className="text-red-500" />; // Expert
    default:
      return <Flame size={20} className="text-gray-400" />; // Default/Unknown
  }
}