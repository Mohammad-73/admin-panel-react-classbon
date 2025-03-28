import { httpInterceptedService } from "../../core/http-service";

export async function coursesLoader() {
  //   return defer({
  //     courses: loadCourses(),
  //   });
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
}

// const loadCourses = async () => {

// };
