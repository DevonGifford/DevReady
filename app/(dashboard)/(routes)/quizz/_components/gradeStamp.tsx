interface GradeStampProps {
  score: number;
  difficulty_modifier?: number;
}

const GradeStamp: React.FC<GradeStampProps> = ({ score }) => {
  const getGrade = (score: number) => {
    if (score >= 90)
      return {
        grade: "A+",
        points: 10,
        title: "Amazing!",
        message: " Looks like we need to turn the difficulty up",
      };
    if (score >= 80)
      return {
        grade: "B+",
        points: 8,
        title: "Good work!",
        message: "Still room for improvement , lets keep improving!",
      };
    if (score >= 70)
      return {
        grade: "C+",
        points: 5,
        title: "Good effort!",
        message: "Keep practicing and learning along the way!",
      };
    if (score >= 60)
      return {
        grade: "D+",
        points: 10,
        title: "Room for improvement!",
        message: " Keep practicing!",
      };
    return {
      grade: "F",
      points: 0,
      title: "Don't give up!",
      message: "Try again!",
    };
  };

  const { grade, message, title, points } = getGrade(score);

  return (
    <div
      className={`grade-stamp ${grade.toLowerCase()} flex flex-col items-center justify-center space-y-2`}
    >
      <div className="grade text-5xl text-devready-green mt-6 font-bold border-8 border-devready-green rounded-full w-40 h-40 p-20 my-2 mx-10 justify-center items-center flex">
        {grade}
      </div>
      <div className="flex flex-col gap-3 justify-center items-center text-center border-2 rounded-xl p-4">
        <span className="title text-lg font-bold">{title}</span>
        <span className="message ">{message}</span>
        <span className="points font-thin text-sm italic">
          {" "}
          You earned {points} points
        </span>
      </div>
    </div>
  );
};

export default GradeStamp;
