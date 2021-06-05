import React from "react";
import { Form } from "react-bootstrap";

export const Input = (props) => {
  let input = null;
  const {label, name, value, onChange, placeholder, options, type} = props;
  switch (type) {
    
    case "select":
      input = (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <select
            className="form-control form-control-sm"
            value={value}
            onChange={onChange}
          >
            <option value="">{placeholder}</option>
              {options.length > 0
                ? options.map((option) => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                  ))
                : null}
          </select>
        </Form.Group>
      );
      break;

    default:
      input = (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
        </Form.Group>
      );
  }
  return input;
};
