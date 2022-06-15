import appAxios, { getAccessToken } from "../app/axios.instance";
import { ICourse } from "../slices/course.slice";

export const getCourse = async (
  take: number,
  skip: number,
  keyword?: string,
  minDuration?: number,
  maxDuration?: number
): Promise<ICourse[] | undefined> => {
  try {
    const queryTake = `?take=${take}`;
    const querySkip = keyword ? `&skip=${skip}` : "";
    const queryKeyword = keyword ? `&keyword=${keyword}` : "";
    const queryMinDuration = minDuration ? `&minDuration=${minDuration}` : "";
    const queryMaxDuration = maxDuration ? `&maxDuration=${maxDuration}` : "";

    const accessToken = await getAccessToken();

    const res = await appAxios.get(
      `/course${queryTake}${querySkip}${queryKeyword}${queryMinDuration}${queryMaxDuration}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data) return undefined;

    const courses: ICourse[] = res.data;

    return courses;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
