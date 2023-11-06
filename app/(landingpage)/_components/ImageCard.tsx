import Image from "next/image";

import { PEOPLE_URL } from "@/constants";

interface ImageCardProps {
    backgroundImage: string;
    title: string;
    subtitle: string;
    peopleJoined: string;
  }
  
export const ImageCard = ({
    backgroundImage,
    title,
    subtitle,
    peopleJoined,
  }: ImageCardProps) => {
    return (
      <div
        className={`h-full w-full min-w-[1100px] ${backgroundImage} bg-cover bg-no-repeat lg:rounded-5xl`}
      >
        <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-8">
          <div className="flexCenter gap-4 rounded-2xl backdrop-blur-sm p-4">
            <div className="rounded-full bg-green-50 p-4">
              <Image
                src="landingpage/folded-map.svg"
                alt="map"
                width={28}
                height={28}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <h4 className="bold-32 text-devready-green/80">{title}</h4>
              <p className="bold-18 text-devready-green/70">{subtitle}</p>
            </div>
          </div>
  
          <div className="flex w-full justify-end gap-6">
            <span className="flex -space-x-4 overflow-hidden">
              {PEOPLE_URL.map((url) => (
                <Image
                  className="inline-block h-10 w-10 rounded-full"
                  src={url}
                  key={url}
                  alt="person"
                  width={52}
                  height={52}
                />
              ))}
            </span>
            <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
          </div>
        </div>
      </div>
    );
  };