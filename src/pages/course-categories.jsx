import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import CategoryList from "../features/categories/components/category-list";
import { useState } from "react";
import { httpInterceptedService } from "../core/http-service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Modal from "../components/modal";
import AddOrUpdateCategory from "../features/categories/components/add-or-update-category";
import { useCategoryContext } from "../features/categories/category-context";

const CourseCategories = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { category } = useCategoryContext();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const deleteCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);
    const response = httpInterceptedService.delete(
      `/CourseCategory/${selectedCategory}`
    );

    toast.promise(
      response,
      {
        pending: "در حال حذف ...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }) {
            return t("categoryList." + data.response.data.code);
          },
        },
      },
      {
        position: "bottom-left",
      }
    );
  };

  const { categories } = useLoaderData();
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <a
              className="btn btn-primary fw-bolder mt-n1"
              onClick={() => setShowAddCategory(true)}
            >
              افزون دسته جدید
            </a>
          </div>
          {(showAddCategory || category) && (
            <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
          )}
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
          >
            <Await resolve={categories}>
              {(loadedCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadedCategories}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف این دسته اطمینان دارید؟"
      >
        <button
          type="button"
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button
          type="button"
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal>
    </>
  );
};

export default CourseCategories;
