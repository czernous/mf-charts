import { IHistory } from "../interfaces";

export const findAssetByName = (data: any, assetName: string) =>
  data.find((x: any) => x.asset === assetName);

const incrementApr = (apr: number, percent: number) => {
  const incrementBy = (apr * percent) / 100;
  return apr + incrementBy;
};

export const generateMockHistory = (
  sourceHistory: IHistory[],
  baseMockValue: number,
  incrementByPercentage: number
) => {
  const targetHistory = [] as IHistory[];
  sourceHistory.map((apr: any, idx: number) => {
    targetHistory.push({
      date: apr.date,
      value: incrementApr(baseMockValue, incrementByPercentage * idx),
    });
  });

  return targetHistory;
};

export const buildChart = (inputData: IHistory[], id: string) => {
  let data: { x: string; y: number }[] = [];
  inputData.forEach((item: IHistory) => {
    data.push({
      x: new Date(item.date).toLocaleDateString("en-GB", {
        weekday: undefined,
        year: undefined,
        month: "short",
        day: "2-digit",
      }),
      y: item.value,
    });
  });

  data = data.slice(-10);

  return [{ id, data }];
};
