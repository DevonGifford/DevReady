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
        <h3 className="text-xl lg:text-2xl text-devready-green font-bold tracking-widest pb-4">
          Reccommended for you
        </h3>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-7/12 md:basis-6/12 xl:basis-4/12 2xl:basis-2/12 transition duration-400 hover:scale-95  cursor-pointer"
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
            <h3 className="text-xl lg:text-2xl text-center lg:text-start text-devready-green font-bold tracking-widest pb-10">
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
                  <CarouselItem key={index} className="pt-1 basis-1/4 transition duration-400 hover:scale-95  cursor-pointer">
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
            <h3 className="text-xl lg:text-2xl text-center lg:text-start text-devready-green font-semibold tracking-widest pb-10">
              Recent activity
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
                  <CarouselItem key={index} className="pt-1 basis-1/4 transition duration-400 hover:scale-95  cursor-pointer">
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
