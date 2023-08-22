import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface RecentActivityCarouselProps {
  title: string;
  data: {
    index: number;
    title: string;
    tags: string[];
    imagelink: string;
    call2action: string;
  }[];
}

const RecentActivityCarousel: React.FC<RecentActivityCarouselProps> = ({
  title,
  data,
}) => {
  return (
    <Card className="w-full pb-10 bg-transparent">
      <CardHeader>
        <h3 className="text-xl lg:text-2xl text-center lg:text-start text-devready-green font-bold tracking-widest pb-10">
          {title}
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
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="pt-1 basis-1/4 transition duration-400 hover:scale-95 cursor-pointe"
              >
                <Link href={item.call2action}>
                  <div className="p-2 py-6 flex items-center border-2 rounded-2xl">
                    <div className="hidden sm:flex w-20 h-20 rounded overflow-hidden">
                      <Image
                        src={item.imagelink}
                        alt={item.title}
                        objectFit="cover"
                        height={100}
                        width={100}
                        className="flex w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col ml-4">
                      <span className="text-sm sm:text-base lg:text-xl font-semibold">
                        #{item.index}. {item.title}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className=" bg-devready-green/20 px-2 text-xs font-semibold rounded-md p-1 m-1"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCarousel;
