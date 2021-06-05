import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import { Layout } from "../../components/Layout";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import "./style.css";
import { UpdateCategoriesModal } from "./components/UpdateCategoriesModal";
import { AddCategoryModal } from "./components/AddCategoryModal";
import { DeleteCategoryModal } from "./components/DeleteCategoryModal";
import "./style.css";
import linerCategories from "../../helpers/linerCategories";

export const Category = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);


  useEffect(() => {
    setAddCategoryModal(false)
  }, [category.loading])

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const categoryList = linerCategories(category.categories);

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const addCategoryForm = () => {

    if(categoryName.trim()==="") {
      alert("Name field is required")
      setAddCategoryModal(false)
      return;
    }

    const form = new FormData();

    if (categoryName.trim() === "") {
      alert("Name is required");
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));
    setAddCategoryModal(false);
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    updateCheckedAndExpandedCategories();
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = linerCategories(category.categories);
    const checkedArr = [];
    const expandedArr = [];

    checked.length > 0 &&
      checked.forEach((categoryId) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArr.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArr.push(category);
      });

    setCheckedArray(checkedArr);
    setExpandedArray(expandedArr);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form)).then((result) => {
      if (result) dispatch(getAllCategory());
    });
    setChecked([]);
    setCheckedArray([]);
    setExpanded([]);
    setExpandedArray([]);
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    setDeleteCategoryModal(true);
    updateCheckedAndExpandedCategories();
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
        }
      });
    }

    setDeleteCategoryModal(false);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <button onClick={() => setAddCategoryModal(true)}>
                  <IoIosAdd /> <span>Add</span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload /> <span>Edit</span>
                </button>
                <button onClick={deleteCategory}>
                  <IoIosTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>

      <AddCategoryModal
        show={addCategoryModal}
        handleClose={() => setAddCategoryModal(false)}
        onSubmit={addCategoryForm}
        modalTitle="Add New Category"
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle="Update Categories"
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      <DeleteCategoryModal
        modalTitle="Delete"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
};
