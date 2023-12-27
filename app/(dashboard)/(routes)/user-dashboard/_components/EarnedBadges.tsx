import React from "react";
import { Button } from "@/components/ui/button";

// 🎯🔮 Future feature - users will be able to earn badges upon completing certain objectives - this component will display those badges....

interface EarnedBadgesProps {
  data?: string[]; 
}

const EarnedBadges: React.FC<EarnedBadgesProps> = ({ data }) => {
  const usersBadges = data || ["baby yoda"]; // If rank is not provided, default ...

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
