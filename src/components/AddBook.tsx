import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../store/reducers/action";

interface FormData {
  bookName: string;
  borrowerName: string;
  borrowDate: string;
  returnDate: string;
}
interface FormErr {
  bookName?: string;
  borrowerName?: string;
  borrowDate?: string;
  returnDate?: string;
}
export default function AddBook() {
  const [formData, setFormData] = useState<FormData>({
    bookName: "",
    borrowerName: "",
    borrowDate: "",
    returnDate: "",
  });

  const [err, setErr] = useState<FormErr>({});
  const [formOpen, setFormOpen] = useState<boolean>(true);
  const dispatch: any = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErr: FormErr = {};
    if (!formData.bookName) newErr.bookName = "Tên sách không được để trống";
    if (!formData.borrowerName)
      newErr.borrowerName = "Tên người mượn không được phép để trống";
    if (!formData.borrowDate)
      newErr.borrowDate = "Ngày mượn không được phép để trống";
    if (!formData.returnDate)
      newErr.returnDate = "Ngày trả không được phép để trống";
    if (
      formData.borrowDate &&
      formData.returnDate &&
      formData.borrowDate > formData.returnDate
    ) {
      newErr.returnDate = "Ngày trả phải sau ngày mượn";
    }
    return newErr;
  };

  // hàm hiển thị form
  const handleCloseForm = () => {
    setFormOpen(false);
  };

  // nếu form sai thì không hiển thị gì
  if (!formOpen) {
    return null;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      dispatch(addBook(formData));
    } else {
      setErr(newErrors);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <form action="" onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <h2>Thêm thông tin mượn sách</h2>
            <span
              onClick={handleCloseForm}
              style={{ cursor: "pointer" }}
              className="material-symbols-outlined"
            >
              close
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="bookName">Tên sách</label>
            <input
              onChange={handleChange}
              value={formData.bookName}
              id="bookName"
              name="bookName"
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          {err.bookName && <span style={{ color: "red" }}>{err.bookName}</span>}
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="borrowerName">Tên người mượn</label>
            <input
              onChange={handleChange}
              value={formData.borrowerName}
              id="borrowerName"
              name="borrowerName"
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          {err.borrowerName && (
            <span style={{ color: "red" }}>{err.borrowerName}</span>
          )}
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="borrowDate">Ngày mượn</label>
            <input
              onChange={handleChange}
              value={formData.borrowDate}
              id="borrowDate"
              name="borrowDate"
              type="date"
              style={{ width: "100%" }}
            />
          </div>
          {err.borrowDate && (
            <span style={{ color: "red" }}>{err.borrowDate}</span>
          )}
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="returnDate">Ngày trả</label>
            <input
              onChange={handleChange}
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              type="date"
              style={{ width: "100%" }}
            />
          </div>
          {err.returnDate && (
            <span style={{ color: "red" }}>{err.returnDate}</span>
          )}
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={addBook}
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
}
