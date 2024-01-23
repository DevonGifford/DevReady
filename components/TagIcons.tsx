// 🎯🔮 to-do-list: work-in-progress
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { tags } from "@/constants/tags-index";

type TagIconsProps = {
  tagArray?: string[];
};

const TagIcons: React.FC<TagIconsProps> = ({ tagArray }) => {
  const defaultTags = ["baby yoda"];
  const tagsToDisplay = tagArray || defaultTags;

  return (
    <div className="flex justify-center items-center flex-row gap-1.5">
      {tagsToDisplay.map((tag) => {
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
