import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/getUser")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Lỗi khi lấy user:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/deleteUser/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Xóa thành công:", data);

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa user:", err);
    }
  };
  // Hàm thêm user
  const handleAddUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email,password,address,birth_date,phone}),
      });
      const data = await res.json();
      console.log(data.message);

      // Lấy lại danh sách user sau khi thêm
      const updatedUsers = await fetch("http://localhost:3000/getUser").then((r) => r.json());
      setUsers(updatedUsers);

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setBirth_date("");
      setPhone("");

    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách người dùng</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
         <input
          type="date"
          placeholder="Birth_day"
          value={birth_date}
          onChange={(e) => setBirth_date(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddUser}>Thêm user</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}{" "}
            <button onClick={() => handleDelete(user.id)}>Xóa</button>{" "}
            <button>Cập nhật</button>
          </li>
         
        ))}
      </ul>
      
      <button>thêm người dùng</button>
    </div>
  );
}

export default App;
