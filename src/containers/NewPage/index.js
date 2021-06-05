import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions/page.actions";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import linerCategories from "../../helpers/linerCategories";

const NewPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const [createModal, setCreateModal] = useState(false);

  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCategories(linerCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setCategoryId("");
      setDesc("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const onCateGoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );

    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = () => {
    if (title.trim() === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);

    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    products.forEach((product) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => (
    <Modal
      show={createModal}
      modalTitle={"title"}
      handleClose={() => setCreateModal(false)}
      onSubmit={submitPageForm}
    >
      <Container>
        <Row>
          <Col>
            <Input
              type="select"
              value={categoryId}
              onChange={onCateGoryChange}
              options={categories}
              placeholder="Select category"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              className=""
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Desc"}
              className=""
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <input
              className="form-control"
              type="file"
              name="banners"
              onChange={handleBannerImages}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              className="form-control"
              type="file"
              name="products"
              onChange={handleProductImages}
            />
          </Col>
        </Row>
      </Container>
    </Modal>
  );

  return (
    <Layout sidebar>
      {/* {page.loading ? (
        <p>Creating Page...please wait</p>
      ) : ( */}
      <>
        {renderCreatePageModal()}
        <button onClick={() => setCreateModal(true)}>Create Page</button>
      </>
      {/* )} */}
    </Layout>
  );
};
export default NewPage;
