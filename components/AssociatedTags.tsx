import React from "react";
import { Button } from "@/components/ui/button";

interface AssociatedTagsProps {
  data?: string[]; 
}

const AssociatedTags: React.FC<AssociatedTagsProps> = ({ data }) => {
  const tagData = data || ["baby yoda"]; // If rank is not provided, default ...

  return (
    <div className="flex justify-center items-center flex-wrap flex-row gap-1.5">
      {tagData.map((tag) => (
        <Button
          variant={"ghost"}
          size={"mini"}
          key={tag}
          value={tag}
          aria-label={`${tag} toggle`}
          onClick={() => {}}
          data-state={"on"}
          className=" text-xs bg-devready-green "
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

export default AssociatedTags;
