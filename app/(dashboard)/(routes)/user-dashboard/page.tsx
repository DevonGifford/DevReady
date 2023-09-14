"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import RecommendedCarousel from "@/components/RecommendedCarousel";
import RecentActivityCarousel from "@/components/RecentActivityCarousel";

import fakeRecentActivityData from "@/constants/fakeRecentActivityData.json";
import fakeRecommendedActivityData from "@/constants/fakeRecommendedData.json";
import { useUserContext } from "@/components/providers/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
  {
    name: "Oct '23",
    total: Math.floor(Math.random() * 1000) + 500,
  },
  {
    name: "Nov '23",
    total: Math.floor(Math.random() * 2000) + 600,
  },
  {
    name: "Dec '23",
    total: Math.floor(Math.random() * 3000) + 700,
  },
  {
    name: "Jan",
    total: Math.floor(Math.random() * 4000) + 8000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

function UserDashboard() {
  const { userProfile } = useUserContext();

  return (
    <div className="h-full flex flex-col p-4 py-20 sm:p-20 space-y-4">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col w-2/3 h-full gap-2">
          <div className="flex flex-col border-2 p-10 h-60 w-full rounded-2xl bg-blue-70">
            <h1 className="text-4xl font-semibold tracking-wide pb-10">
              Welcome to your,{" "}
              <span className=" text-devready-green">Profile</span>
            </h1>
            <div className="flex flex-row gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={userProfile?.account.userimage!}
                  alt="profile-picture"
                />
                <AvatarFallback>ZTM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-2xl font-semibold">{userProfile?.account.username}</p>
                <p className="text-base font-thin">{userProfile?.account.career_title}</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer
            width="100%"
            height={350}
            className="border-2 rounded-2xl py-4 "
          >
            <BarChart data={data}>
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
        <div className="w-1/3">
          <RecentActivityCarousel
            title="Most popular"
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
