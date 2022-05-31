import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { buildChart } from "../../helpers";
import "./style.css";

function Chart({ data, name }: any) {
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    if (data) setChart(buildChart(data, name));
  }, [data, name]);

  return (
    <div className="chart__wrapper">
      <h3 className="chart__title">{name}</h3>
      {chart ? (
        <ResponsiveLine
          data={chart}
          enableArea={true}
          margin={{ top: 20, right: 50, bottom: 90, left: 110 }}
          colors={["#B64BDF", "#395B87"]}
          enableGridX={true}
          enablePoints={false}
          useMesh={true}
          enableSlices={false}
          yFormat=" =-$.0"
          yScale={{
            type: "linear",
            stacked: true,
            reverse: false,
          }}
          theme={{
            textColor: "#ABB6FA",

            grid: {
              line: {
                stroke: "#373B63",
              },
            },
            tooltip: {
              container: {
                background: "#252b46",
              },
            },
          }}
          defs={[
            linearGradientDef("gradientA", [
              { offset: 0, color: "inherit" },
              { offset: 100, color: "inherit", opacity: 0 },
            ]),
          ]}
          fill={[{ match: "*", id: "gradientA" }]}
        />
      ) : null}
    </div>
  );
}

export default Chart;
