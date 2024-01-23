// 🎯🔮 to-do-list: work-in-progress
import { Button } from "@/components/ui/button";

type TagButtonsProps = {
  data?: string[];
};

export const TagButtons: React.FC<TagButtonsProps> = ({ data }) => {
  const defaultTags = ["baby yoda"];
  const tagData = data || defaultTags; // If rank is not provided, default ...

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
