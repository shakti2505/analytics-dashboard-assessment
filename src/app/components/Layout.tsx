import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./overview/Overview";
import Barchart from "./Charts/Barchart";
import AvgRangeByMake from "./overview/AvrageRangeByMake";
import TableComponent from "./Tablecomponet";
import Areachart from "./Charts/AreaChart";

// import Piechart from "./Charts/PieChart";

interface LayoutProps {
  // define your props here
}

type dataItem = {
  makeCounts: Array<Item>;
  avgRangeByMake: Array<Item>;
  countyCounts: Array<Item>;
};

type Item = {
  averageRange: number;
  make: string;
};

const Layout: React.FC<LayoutProps> = () => {
  // const [totalAvgOfAllVehicles, setTotalAvgOfAllVehicles] = useState<
  //   number | Item[]
  // >(0);
  const [makeCounts, setMakeCount] = useState([]);
  const [avgRangeData, SetAvgRangeData] = useState<
    { avgRange: number; max_avg_range: Item; min_avg_range: Item }[]
  >([]);
  const [avgRangeByMake, setAvgRangeByMake] = useState([]);

  // calculating Total AvgRange
  const CalulateTotalAvgRangeOfAllVehicels = (data: dataItem) => {
    const avgRange = data.avgRangeByMake.reduce(
      (accumulator: number, item: Item) =>
        accumulator + Math.floor(item.averageRange),
      0
    );
    const min_avg_range = data.avgRangeByMake.sort(
      (a, b) => a.averageRange - b.averageRange
    )[0];
    const max_avg_range = data.avgRangeByMake.sort(
      (a, b) => a.averageRange - b.averageRange
    )[data.avgRangeByMake.length - 1];

    const avgData = {
      avgRange,
      max_avg_range,
      min_avg_range,
    };
    let result = [];
    result.push(avgData);
    return result;
  };

  // const MinAvgRange = () => {
  //   const res = (avgRangeByMake as Item[]).sort(
  //     (a, b) => a.averageRange - b.averageRange
  //   )[0];
  //   return res;
  // };

  const getData = async () => {
    try {
      const res = await fetch(
        "https://res.cloudinary.com/dtbz1n84e/raw/upload/v1736782543/docQueryAi/processed_data_kixt2z.json",
        {
          method: "get",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      const totalAvgRange = CalulateTotalAvgRangeOfAllVehicels(data);
      SetAvgRangeData(totalAvgRange);
      setMakeCount(data.makeCounts);
      setAvgRangeByMake(data.avgRangeByMake);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Tabs defaultValue="Overview" className="py-3">
      <TabsList className="grid grid-cols-2 w-96 bg-[#27272A] gap-2 outline-none">
        <TabsTrigger value="Overview" className="hover:text-red-500 ">Overview</TabsTrigger>
        <TabsTrigger value="Analytics" className="hover:text-red-500">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="Overview" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center w-full gap-4">
          {avgRangeData.map((item, index) => (
            <React.Fragment key={item.avgRange + index}>
              <div className="flex-1 min-w-[250px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <Overview
                  description="Average range in KM"
                  title="Total Average Range"
                  item={item.avgRange}
                />
              </div>
              <div className="flex-1 min-w-[250px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <Overview
                  description="Maximum average range in KM"
                  title="Max Average Range"
                  item={Math.floor(item.max_avg_range.averageRange)}
                />
              </div>
              <div className="flex-1 min-w-[250px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <Overview
                  description="Minimum average range in KM"
                  title="Min Average Range"
                  item={item.min_avg_range.averageRange}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Charts Section */}
        <div className="flex flex-wrap w-full gap-4">
          <div className="flex-1 w-full lg:w-1/2">
            <Barchart makeCounts={makeCounts} avgRangeByMake={avgRangeByMake} />
          </div>
          <div className="flex w-full lg:w-1/2">
            <AvgRangeByMake avgRangeByMake={avgRangeByMake} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="Analytics" className="flex w-full">
      <div className="flex flex-wrap w-full gap-4">
          <div className="flex-1 w-full lg:w-1/2">
          <TableComponent avgRangeByMake={avgRangeByMake} />
          </div>
          <div className="flex w-full lg:w-1/2">
          <Areachart makeCounts={makeCounts}/>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Layout;
