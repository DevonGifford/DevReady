import React from "react";
import { Button } from "@/components/ui/button";
import { tags } from "@/constants/tags-index";
import Image from "next/image";

interface TagIconsProps {
  data?: string[];
}

const TagIcons: React.FC<TagIconsProps> = ({ data }) => {
  const tagData = data || ["baby yoda"]; // If data is not provided, default to ["baby yoda"]

  return (
    <div className="flex justify-center items-center flex-row gap-1.5">
      {tagData.map((tag) => {
        const tagIcon = tags.find((t) => t.label === tag);

        if (tagIcon) {
          return (
            <Image
              key={tag}
              src={`/sidebar-icons/${tagIcon.customIcon}`}
              alt={tag}
              width={20}
              height={20}
            />
          );
        } else {
          //-Render a default button for tags without custom icons
          return (
            <Button
              variant={"ghost"}
              size={"mini"}
              key={tag}
              value={tag}
              aria-label={`${tag} toggle`}
              onClick={() => {}}
              data-state={"on"}
              className="text-xs bg-devready-green"
            >
              {tag}
            </Button>
          );
        }
      })}
    </div>
  );
};

export default TagIcons;
