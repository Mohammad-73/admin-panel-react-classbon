import { httpInterceptedService } from "../../core/http-service";

export function coursesLoader() {
  const courses = httpInterceptedService
    .get("/Course/list")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { courses };
}
