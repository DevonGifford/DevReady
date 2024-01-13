import React from "react";

export type QuizType = "course" | "topic" | "interview";

type QuizTypeInstructionsProps = {
  type: QuizType;
};

export const QuizTypeInstructions: React.FC<QuizTypeInstructionsProps> = ({
  type,
}) => {
  let instructions: JSX.Element | null = null;

  switch (type) {
    case "course":
      instructions = (
        <div className="flex flex-col text-center py-4">
          <h4 className="text-lg pb-4 underline underline-offset-4">
            <span>This is a </span>
            <span className="font-bold">{type}{" "}</span>
            <span>quiz type</span>
          </h4>
          <p className="flex flex-col gap-2 text-sm italic mx-10 max-w-2xl">
            <span>
              This quiz type simplifies learning by focusing on community-driven
              topics or content from the Zero To Mastery (ZTM) courses.
            </span>
            <span>
              It comprises a curated selection of questions tailored for spaced
              repetition learning, helping you reinforce knowledge efficiently.
            </span>
          </p>
        </div>
      );
      break;
    case "topic":
      instructions = (
        <div className="flex flex-col text-center py-4">
          <h4 className="text-lg font-semibold pb-4 underline underline-offset-4">
            <span>This is a </span>
            <span className="font-bold">{type}{" "}</span>
            <span>quiz type</span>
          </h4>
          <p className="flex flex-col gap-2 text-sm italic mx-10 max-w-2xl">
            <span>
              This quiz type features hundreds of questions on the topic, our
              adaptive algorithm learns from your responses, curating a
              personalized learning experience.
            </span>
            <span>
              As you progress, it dynamically selects questions, optimizing your
              spaced repetition learning journey.
            </span>
          </p>
        </div>
      );
      break;
    case "interview":
      instructions = (
        <div className="flex flex-col text-center py-4">
          <h4 className="text-lg font-semibold pb-4 underline underline-offset-4">
            <span>This is a </span>
            <span className="font-bold">{type} </span>
            <span>quiz type</span>
          </h4>
          <p className="flex flex-col gap-2 text-sm italic mx-10 max-w-2xl">
            <span>
              The interview type presents a comprehensive curated collection of
              over a hundred questions sourced and updated by industry
              professionals.
            </span>
            <span>
              This advanced quiz gauges your skill level and prepares you for
              real-world scenarios in job hunting process.
            </span>
            <span>
              Leveraging a smart algorithm, it assesses and tailors questions to
              enhance your readiness for professional opportunities.
            </span>
          </p>
        </div>
      );
      break;
    default:
      instructions = <div>No instructions available for this type.</div>;
  }

  return instructions || <div>No instructions available for this type.</div>;
};
