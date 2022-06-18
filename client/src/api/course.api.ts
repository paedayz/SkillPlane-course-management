import appAxios, { getAccessToken } from "../app/axios.instance";
import { openNotificationWithIcon } from "../common/notification";
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
    const querySkip = `&skip=${skip}`;
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
  } catch (error: any) {
    if (error.response.data.error)
      openNotificationWithIcon("error", "Error", error.response.data.error);
    return undefined;
  }
};

export const createCourse = async (
  formData: FormData
): Promise<ICourse | undefined> => {
  try {
    const accessToken = await getAccessToken();
    const res = await appAxios.post("/course", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.data) return undefined;

    const courses: ICourse = res.data;

    return courses;
  } catch (error: any) {
    if (error.response.data.error)
      openNotificationWithIcon("error", "Error", error.response.data.error);
    return undefined;
  }
};

export const deleteCourse = async (
  courseId: number
): Promise<string | undefined> => {
  try {
    const accessToken = await getAccessToken();
    const res = await appAxios.delete(`/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.data) return undefined;

    return res.data;
  } catch (error: any) {
    if (error.response.data.error)
      openNotificationWithIcon("error", "Error", error.response.data.error);
    return undefined;
  }
};
