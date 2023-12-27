"use client";

import { useUserContext } from "@/components/providers/UserProvider";
import RecentActivityCarousel from "@/components/RecentActivityCarousel";
import RecommendedCarousel from "@/components/RecommendedCarousel";

import fakeRecentActivityData from "@/constants/fakeRecentActivityData.json";
import fakeRecommendedActivityData from "@/constants/fakeRecommendedData.json";

function LandingDashboardPage() {
  const { userProfile } = useUserContext();

  return (
    <div className="h-full flex flex-col p-4 py-20 sm:p-20 space-y-4">
      <h1 className="text-4xl font-semibold tracking-wide pb-4">
        Welcome Back,{" "}
        <span className=" text-devready-green">
          {userProfile?.account.username}
        </span>
      </h1>

      <RecommendedCarousel data={fakeRecommendedActivityData} />

      <div className="flex flex-col xl:flex-row gap-10 justify-between pt-10">
        <RecentActivityCarousel
          title="Most popular"
          data={fakeRecentActivityData}
        />
        <RecentActivityCarousel
          title="Recent activity"
          data={fakeRecentActivityData}
        />
      </div>
    </div>
  );
}

export default LandingDashboardPage;
