"use client";

import { useUserContext } from "@/components/providers/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RecentActivityCarousel from "@/components/RecentActivityCarousel";
import RecommendedCarousel from "@/components/RecommendedCarousel";
import CurrentRank from "./_components/CurrentRank";
import { TagButtons } from "@/components/TagButtons";
import RatingHistory from "./_components/RatingHistory";

import fakeRecentActivityData from "@/constants/mock/fakeRecentActivityData.json";
import fakeRecommendedActivityData from "@/constants/mock/fakeRecommendedData.json";

function UserDashboard() {
  const { userProfile } = useUserContext();

  return (
    <div className="h-full flex flex-col p-4 py-20 sm:py-20 2xl:px-10 space-y-4">
      {/* //👇 HEADING */}
      <h1 className="text-4xl font-semibold tracking-wide">
        Welcome to your <span className=" text-devready-green">Profile</span>
      </h1>
      {/* //👇 LEFT HALF */}
      <div className="flex flex-col 2xl:flex-row justify-between gap-4">
        <div className="flex flex-col 2xl:w-2/3 h-full gap-5">
          {/* //👇 HEADER SECTION */}
          <div className="flex flex-col gap-5 xl:flex-row xl:gap-8 items-center xl:items-stretch xl:justify-between ">
            <div className="flex flex-row gap-5 justify-start items-center border-2 p-10 w-full rounded-2xl">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userProfile?.account.userimage!}
                  alt="profile-picture"
                />
                <AvatarFallback>ZTM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-semibold">
                  {userProfile?.account.username}
                </p>
                <p className="text-lg font-thin ml-1 mb-3">
                  {userProfile?.account.career_title}
                </p>
                {/* //👇  BADGES SECTION */}
                {/* // 🎯🔮 Future feature - users will be able to earn badges upon completing certain objectives - this component will display those badges.... */}
                <TagButtons data={userProfile?.account.skills_list!} />
              </div>
            </div>
            <CurrentRank rank={userProfile?.ranking?.current_rank} />
          </div>

          <RatingHistory />
        </div>

        {/* //👇 RIGHT HALF */}
        <div className="2xl:w-1/3 h-full justify-center items-center">
          <RecentActivityCarousel
            title="Recent activity"
            data={fakeRecentActivityData}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between"></div>
      <RecommendedCarousel data={fakeRecommendedActivityData} />
    </div>
  );
}

export default UserDashboard;
