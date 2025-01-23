import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// https://youtu.be/P54huimnQNY?si=GyUjYlBzeiWFGdW5&t=2941

function UserEdit() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    });

    const { id } = useParams();

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchUser(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentUser) {
            setUserData(currentUser);
        }
    }, [currentUser]);

    const handleSave = async () => {
        const result = userData.id ? await dispatch(editUser(userData)) : await dispatch(createUser(userData));

        if (result.sucecss) {
            setMessage("User saved successfully");
            setIsError(false);
            history.push("/");
        } else {
            setMessage(result.message || "An error occurred");
            setIsError(true);
        }
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                name="name"
                value={userData.email}
                onChange={handleChange}
                placeholder="Name"
                className="mb-2 w-full rounded border p-2"
            />
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mb-2 w-full rounded border p-2"
            />
            <input
                type="text"
                name="phoneNumber"
                value={userData.email}
                onChange={handleChange}
                placeholder="phoneNumber"
                className="mb-2 w-full rounded border p-2"
            />
            {message && <div className={isError ? "text-red-500" : "text-green-500"}>{message}</div>}
            <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">save</button>
        </div>
    )
}

export default UserEdit;
