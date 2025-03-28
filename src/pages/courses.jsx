import CourseList from "../features/courses/components/course-list";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const Courses = () => {
  const { courses } = useLoaderData();
  // console.log(coursePromise);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1">افزون دوره جدید</a>
        </div>
        <Suspense
          fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
        >
          <Await resolve={courses}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Courses;
