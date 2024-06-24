import axios from "axios";
import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import "./managerBook.css";

interface Book {
  id: number;
  nameBook: string;
  borrowerName: string;
  borrowerDate: string;
  returnDate: string;
  status: string;
}
export default function ManagerBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  const loadData = () => {
    axios
      .get("http://localhost:8080/book")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);

  const toggleAddBookForm = () => {
    setShowAddBookForm(true);
  };

  return (
    <div>
      <div>
        <h2>Quản lí mượn sách</h2>
        <button onClick={toggleAddBookForm} style={{ backgroundColor: "blue" }}>
          Thêm thông tin
        </button>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.nameBook}</td>
              <td>{book.borrowerName}</td>
              <td>{book.borrowerDate}</td>
              <td>{book.returnDate}</td>
              <td>{book.status}</td>
              <td>
                <button style={{ backgroundColor: "yellow" }}>Sửa</button>
                <button style={{ backgroundColor: "red" }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddBookForm && (
        <div className="overlay">
          <AddBook />
        </div>
      )}
    </div>
  );
}
