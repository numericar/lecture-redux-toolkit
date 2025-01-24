import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchUsers } from "../actions/userAction";
import { fetchUsers } from "../reducers/memberSlice"; // ย้ายจากการเรียก action จาก redux, มาเรียกผ่าน slice ของ toolkit

function UserList() {
    const dispatch = useDispatch();
    // state.<key ที่เราตั้งไว้ใน store>.<ตัวแปรที่เราเก็บไว้ใน state>
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]); // ถ้า dispatch พร้อม ค่อยทำงาน

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div className="container mx-auto p-4">
            <h3 className="mb-4 text-lg font-semibold">User List</h3>
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex items-center justify-between"
                >
                    <div>
                        <p>name: {user.name}</p>
                        <p>email: {user.email}</p>
                        <p>phoneNumber: {user.phoneNumber}</p>
                    </div>
                    <div>
                        <button
                            className="
                            mr-2
                            rounded
                            bg-red-500
                            px-3
                            py-1
                            text-white"
                        >
                            Delete
                        </button>
                        <Link to={`/edit/${user.id}`}>
                            <button className="
                                rounded
                                bg-blue-500
                                px-3
                                py-1
                                text-white">
                                    Edit
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;
