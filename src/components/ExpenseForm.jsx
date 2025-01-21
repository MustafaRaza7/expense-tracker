import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  // const [expense, setExpense] = useState({
  //   // id: crypto.randomUUID(),
  //   title: "",
  //   category: "",
  //   amount: "",
  //   // email: "",
  // });
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter the title" },
      { minLength: 2, message: "Title should be atleast 2 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter the amount" },
      { pattern: /^(0|[1-9]\d*)(\.\d+)?$/, message: 'Please enter a valid number' },
    ],
    // email: [{ required: true, message: "Please enter the valid email" }, {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Please enter a valid email'}],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (validationConfig[key] && Array.isArray(validationConfig[key])) {
        validationConfig[key].some((rule) => {
          if (rule.required && !value) {
            errorsData[key] = rule.message; // Use the message from the rule
            return true;
          }
          if (rule.minLength && value.length < rule.minLength) {
            errorsData[key] = rule.message;
            return true;
          }
          if (rule.pattern && !rule.pattern.test(value)){
            errorsData[key] = rule.message
            return true
          }
        });
      }
    });

    // Set the errors and return the errors object
    setErrors(errorsData);
    return errorsData;
  };
  // const validate = (formData) => {
  //   const errorsData = {};

  //   Object.entries(formData).forEach(([key, value]) => {
  //     validationConfig[key].forEach((rule) => {
  //       if(rule.required){
  //         errorsData[key] = rule.message
  //       }
  //     })
  //   })

  // if (!formData.title) {
  //   errorsData.title = "Title is required";
  // }

  // if (!formData.category) {
  //   errorsData.category = "Please select a category";
  // }

  // if (!formData.amount) {
  //   errorsData.amount = "Amount is required";
  // }

  //   setErrors(errorsData);
  //   return errorsData;
  // };
  // const titleRef = useRef()
  // const categoryRef = useRef()
  // const amountRef = useRef()

  // useEffect(() => {
  //   console.log(titleRef);
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }

    // const expense = { title, category, amount, id: crypto.randomUUID() };
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    // {
    //   title: titleRef.current.value,
    //   category: categoryRef.current.value,
    //   amount: amountRef.current.value,
    //   id: crypto.randomUUID()
    // }
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };
  // const getFormData = (form) => {
  //   const formData = new FormData(form)
  //   const data = {}
  //   for (const [key, value] of formData.entries()){
  //     data[key] = value
  //   }
  //   return data
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };
  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <Input
          label="Title"
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Select
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          options={[
            "Grocery",
            "Clothes",
            "Bills",
            "Education",
            "Medicine",
            "Food",
          ]}
          defaultOption="Select Category"
          error={errors.category}
        />
        <Input
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        {/* <Input
          label="Email"
          id="email"
          name="email"
          value={expense.email}
          onChange={handleChange}
          error={errors.email}
        /> */}
        <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
      </form>
      {/* <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            // ref={categoryRef}
          >
            <option value="" hidden>
              Select Category
            </option>
            <option value="Grocery">Grocery</option>
            <option value="Clothes">Clothes</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Medicine">Medicine</option>
          </select>
          <p className="error">{errors.category}</p>
        </div> */}
    </>
  );
}
