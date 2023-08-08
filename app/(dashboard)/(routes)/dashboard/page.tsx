"use client";

import { useUserContext } from "@/components/providers/UserProvider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

function MainPage() {
  const { userProfile } = useUserContext();
  return (
    <div className="h-full flex flex-col p-20 space-y-4">
      <h1 className="text-lg font-medium">
        Welcome Back, {userProfile?.account.username}{" "}
      </h1>

      <h3 className="text-devready-green">Coming Soon</h3>

      <div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/3 md:basis-2/4 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default MainPage;
