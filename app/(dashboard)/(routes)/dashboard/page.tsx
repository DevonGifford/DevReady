"use client";

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

function MainPage() {
  const { userProfile } = useUserContext();
  return (
    <div className="h-full flex flex-col p-20 space-y-4">
      <h1 className="text-2xl font-semibold tracking-wide pb-4">
        Welcome Back, {userProfile?.account.username}{" "}
      </h1>


      {/* // 👇 Reccommended for you */}
      <div>
        <h3 className="text-xl text-devready-green font-semibold tracking-wider pb-4">
          Reccommended for you
        </h3>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/3 md:basis-3/12 xl:basis-2/12"
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

      {/* // 👇 Most popular, Recent Activity */}
      <div className="flex flex-col lg:flex-row gap-10 justify-between pt-10">
        <Card className="w-full pb-10 bg-transparent">
          <CardHeader>
            <h3 className="text-xl text-devready-green font-semibold tracking-wider pb-4">
              Most popular
            </h3>
          </CardHeader>
          <CardContent className="flex flex-row w-full justify-center items-center">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full"
            >
              <CarouselContent className="-mt-1 h-[400px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pt-1 basis-1/4">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <span className="text-3xl font-semibold">
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
          </CardContent>
        </Card>
        <Card className="w-full pb-10 bg-transparent">
          <CardHeader>
            <h3 className="text-xl text-devready-green font-semibold tracking-wider pb-4">
              Most popular
            </h3>
          </CardHeader>
          <CardContent className="flex flex-row w-full justify-center items-center">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full"
            >
              <CarouselContent className="-mt-1 h-[400px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pt-1 basis-1/4">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <span className="text-3xl font-semibold">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MainPage;
