import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import { Layout } from "../../components/Layout";
import Modal from "../../components/UI/Modal";

import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
import { Input } from "../../components/UI/Input";

const Products = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const handleClose = () => {
    setShow(false);
  };
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    console.log(productPictures);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
    setName("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setProductPictures([]);
  };
  const handleShow = () => setShow(true);
  const handleCloseProductDetails = () => {
    setProductDetailsModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetailsModal(true);
    setProductDetails(product);
    console.log(product);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    options.sort((a, b) => a.name.localeCompare(b.name));

    return options;
  };

  const handleProductPicture = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.map((product) => (
            <tr
              key={product._id}
              onClick={() => {
                showProductDetailsModal(product);
              }}
            >
              <td>1</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>{product.category && product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal modalTitle="Add new product" show={show} handleClose={handleClose} onSubmit={submitProductForm}>
        <Input
          value={name}
          label={"Name"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={quantity}
          label={"Quantity"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          value={price}
          label={"Price"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          value={description}
          label={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Category</label>
        <select
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
        >
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="categoryImage"
          onChange={handleProductPicture}
        />
      </Modal>
    );
  };

  const renderShowProductDetailsModal = () => {
    if (!productDetails) return null;
    return (
      <Modal
        modalTitle="Add new product"
        show={productDetailsModal}
        handleClose={handleCloseProductDetails}
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures &&
                productDetails.productPictures.map((picture, index) => (
                  <div key={index} className="productImgContainer">
                    <img src={generatePublicUrl(picture.img)} alt="" />
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
        {renderAddProductModal()}
        {renderShowProductDetailsModal()}
      </Container>
    </Layout>
  );
};

export default Products;
