import { httpInterceptedService } from "../../core/http-service";

export async function categoriesLoader({ request }) {
  const page = new URL(request.url).searchParams.get("page") || 1;
  // const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = "/CourseCategory/sieve";

  url += `?page=${page}&pageSize=${5}`;

  const categories = httpInterceptedService
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { categories };
}
