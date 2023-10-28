"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import RecommendedCarousel from "@/components/RecommendedCarousel";
import RecentActivityCarousel from "@/components/RecentActivityCarousel";

import fakeRecentActivityData from "@/constants/fakeRecentActivityData.json";
import fakeRecommendedActivityData from "@/constants/fakeRecommendedData.json";
import fakeRatingHistoryData from "@/constants/fakeRatingHistoryData.json";

import { useUserContext } from "@/components/providers/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrophyIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function UserDashboard() {
  const { userProfile } = useUserContext();

  return (
    <div className="h-full flex flex-col p-4 py-20 sm:p-20 space-y-4">
      {/* //👇 HEADING */}
      <h1 className="text-4xl font-semibold tracking-wide">
        Welcome to your <span className=" text-devready-green">Profile</span>
      </h1>
      {/* //👇 LEFT HALF */}
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col w-2/3 h-full gap-5">
          {/* //👇 HEADER SECTION */}
          <div className="flex flex-row justify-between">
            {/* //👇 USER PROFILE SECTION */}
            <div className="flex flex-row gap-5 justify-start items-center border-2 p-10 w-full rounded-2xl bg-blue-70">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userProfile?.account.userimage!}
                  alt="profile-picture"
                />
                <AvatarFallback>ZTM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-3xl font-semibold">
                  {userProfile?.account.username}
                </p>
                <p className="text-lg font-thin ml-1">
                  {userProfile?.account.career_title}
                </p>
                {/* //🔮 FUTURE BADGES SECTION */}
                <div className="flex flex-wrap flex-row gap-1.5">
                  {userProfile?.account.skills_list?.map((skill) => (
                    <Button
                      variant={"ghost"}
                      size={"mini"}
                      key={skill}
                      value={skill}
                      aria-label={`${skill} toggle`}
                      onClick={() => {}}
                      data-state={"on"}
                      className=" text-xs bg-devready-green "
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {/* //👇 CURRENT RANK */}
            <div className="flex flex-col justify-center items-center border-2 p-6 w-96 rounded-2xl bg-blue-70">
              <p className="text-2xl font-semibold">Current Rank</p>
              <p className="text-sm font-thin italic pb-5">
                This is still a work in progress
              </p>
              <TrophyIcon size={50} />
              <Progress max={100} value={44} className="mt-10" />
            </div>
          </div>

          {/* //👇 BAR GRAPH SECTION */}
          <div className="border-2 rounded-2xl">
            <h3 className="text-xl lg:text-2xl text-devready-green font-bold tracking-widest p-4">
              Rating History:
            </h3>

            <ResponsiveContainer width="100%" height={333} className=" py-4 ">
              <BarChart data={fakeRatingHistoryData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} SR`}
                />
                <Bar
                  dataKey="total"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* //👇 RIGHT HALF */}
        <div className="w-1/3 h-full justify-center items-center">
          <RecentActivityCarousel
            title="Recent activity"
            data={fakeRecentActivityData}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between"></div>
      {/* //👇 Carousel Bottom */}
      <RecommendedCarousel data={fakeRecommendedActivityData} />
    </div>
  );
}

export default UserDashboard;
