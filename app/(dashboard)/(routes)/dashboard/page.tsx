"use client";

import RecentActivityCarousel from "@/components/RecentActivityCarousel";
import RecommendedCarousel from "@/components/RecommendedCarousel";
import { useUserContext } from "@/components/providers/UserProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

import fakeRecentActivityData from "@/constants/fakeRecentActivityData.json";
import fakeRecommendedActivityData from "@/constants/fakeRecommendedData.json";

function MainPage() {
  const { userProfile } = useUserContext();

  // Sample data for carousel sections
  const recommendedData: number[] = Array.from(
    { length: 8 },
    (_, index) => index + 1
  );
  
  const popularData: number[] = Array.from(
    { length: 5 },
    (_, index) => index + 1
  );

  const recentActivityData: number[] = Array.from(
    { length: 5 },
    (_, index) => index + 1
  );

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

export default MainPage;
