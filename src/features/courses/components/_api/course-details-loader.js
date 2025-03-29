import { httpInterceptedService } from "../../../../core/http-service";

export async function courseDetailsLoader({ params }) {
  const response = await httpInterceptedService.get(
    `/Course/by-id/${params.id}`
  );

  return response.data;
}
