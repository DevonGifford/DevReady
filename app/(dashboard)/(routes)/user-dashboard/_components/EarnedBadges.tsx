import React from "react";
import { Button } from "@/components/ui/button";

interface EarnedBadgesProps {
  data?: string[]; // Define the rank as an optional number
}

const EarnedBadges: React.FC<EarnedBadgesProps> = ({ data }) => {
  const usersBadges = data || ["baby yoda"]; // If rank is not provided, default to 0

  return (
    <div className="flex flex-wrap flex-row gap-1.5">
      {usersBadges.map((badge) => (
        <Button
          variant={"ghost"}
          size={"mini"}
          key={badge}
          value={badge}
          aria-label={`${badge} toggle`}
          onClick={() => {}}
          data-state={"on"}
          className=" text-xs bg-devready-green "
        >
          {badge}
        </Button>
      ))}
    </div>
  );
};

export default EarnedBadges;
