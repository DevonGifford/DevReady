import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  PlusCircle,
  MonitorSmartphone,
  DatabaseBackup,
  AlignVerticalJustifyStart,
  BrainCircuit,
  ScrollText,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  PlusCircle,
  MonitorSmartphone,
  DatabaseBackup,
  AlignVerticalJustifyStart,
  BrainCircuit,
  ScrollText,
};

interface RecommendedCarouselProps {
  data: {
    label: string;
    icon: string;
    href: string;
    isMain?: boolean;
  }[];
}

const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-xl lg:text-2xl text-devready-green font-bold tracking-widest pb-4">
        Recommended for you
      </h3>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1 w-full gap-8">
          {data.map((item, index) => {
            const IconComponent = iconMap[item.icon]; //👈 getting the lucidIcon
            return (
              <CarouselItem
                key={index}
                className="pl-1 basis-7/12 md:basis-6/12 xl:basis-4/12 2xl:basis-3/12 3xl:basis-1/4 transition duration-400 hover:scale-95 cursor-pointer hover:shadow-xl"
              >
                <Link href={item.href}>
                  <Card className="bg-secondary">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="flex flex-col justify-center items-center text-center gap-6">
                        <h1 className="text-base sm:text-xl lg:text-xl font-semibold">
                          {item.label}
                        </h1>
                        <IconComponent size={57} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecommendedCarousel;
