import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/getUser")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Lỗi khi lấy user:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách người dùng</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} <button>xóa</button> <button>cập nhật</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
