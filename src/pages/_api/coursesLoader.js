import { httpInterceptedService } from "../../core/http-service";

export function coursesLoader() {
  return {
    courses: httpInterceptedService.get("/Course/list").then((res) => res.data),
  };
}
