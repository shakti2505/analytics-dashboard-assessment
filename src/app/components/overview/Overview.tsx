import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewProps {
  item: number;
  description: string;
  title: string;
}

const Overview: React.FC<OverviewProps> = ({
  item,
  description,
  title,
}: OverviewProps) => {
  console.log("avgRangeData in overview", item);
  return (
    <Card className="bg-[#09090B] border-[#27272A] flex md:flex-col">
      <CardHeader>
        <CardTitle className="text-white text-md text-left">{title}</CardTitle>
        <CardDescription className="text-4xl text-white text-left">
          {item} KM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default Overview;
