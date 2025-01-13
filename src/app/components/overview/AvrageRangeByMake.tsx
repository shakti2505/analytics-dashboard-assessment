import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AvgRangeByMakeType {
  make: string;
  averageRange: number;
}

interface AvgRangeByMakeProps {
  avgRangeByMake: Array<AvgRangeByMakeType>;
}

const AvgRangeByMake: React.FC<AvgRangeByMakeProps> = ({avgRangeByMake}: AvgRangeByMakeProps) => {
  const [topAvgRange, setTopAvgRange] = useState<AvgRangeByMakeType | null>(
    null
  );

  const CalculateHigestAvgRange = () => {
    const res = avgRangeByMake.sort(
      (a, b) => b.averageRange - a.averageRange
    )[0];
    setTopAvgRange(res);
  };

  useEffect(() => {
    CalculateHigestAvgRange();
  }, []);

  return (
    <Card className="outline-none flex-1 h-96 overflow-y-auto bg-[#09090B] border-0 text-white">
      <CardHeader>
        <CardTitle>Average Range by Makers</CardTitle>
        <CardDescription>
          Top Average Range is {topAvgRange ? topAvgRange.make : "N/A"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {avgRangeByMake &&
          avgRangeByMake.map((item: AvgRangeByMakeType, index: number) => {
            return (
              <div
                key={item.averageRange + index}
                className="flex  justify-between items-center text-white py-2"
              >
                <div className="flex flex-row items-center justify-between gap-2">
                  <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback className="text-black">
                      {item.make && item.make.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-md">{item.make}</p>
                </div>
                <p className="text-xl">{Math.floor(item.averageRange)} km</p>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default AvgRangeByMake;
