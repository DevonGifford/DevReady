import React from "react";
import { Progress } from "@/components/ui/progress";
import { TrophyIcon } from "lucide-react";

interface CurrentRankProps {
  rank?: number;
}

const CurrentRank: React.FC<CurrentRankProps> = ({ rank }) => {
  const currentRank = rank || 0; // If rank is not provided, default to 0

  return (
    <div className="flex flex-col justify-center items-center text-center border-2 p-6 w-96 rounded-2xl ">
      <p className="text-2xl font-semibold">Current Rank</p>
      <p className="text-sm font-thin italic pb-5">
        This is still a work in progress
      </p>
      <TrophyIcon size={50} />
      <Progress max={100} value={currentRank} className="mt-10" />
    </div>
  );
};

export default CurrentRank;
