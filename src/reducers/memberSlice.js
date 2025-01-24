import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users";

// createAsyncThunk ใช้สำหรับ function ที่เป็น async
// (ชื่อของ action, ฟังก์ชัน)
// ไม่ต้องใช้ try catch เพราะ createAsyncThunk มีการห่อด้วย try catch อยู่แล้ว และถ้ามี error จะเกิด action type ชื่อ rejected
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
});

export const editUser = createAsyncThunk("users/editUser", async (user) => {
    const response = await axios.put(`${API_URL}/${user.id}`, user);
    return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState: { // กำหนด state เริ่ทต้น
        users: [],
        currentUSer: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {  // ใช้สร้าง reducer โดยการ add matcher เพื่อจัดการกับสถานะต่าง ๆ ที่ถูกส่งมาจาก createAsyncThunk
        // pending คือ ข้อมูลอยู่ระหว่างการโหลด
        // fulfilled คือ ข้อมูลโหลดเสร็จแล้ว
        // rejected คือ ข้อมูลมีข้อผิดพลาดระหว่างการโหลด
        // โดยทั้ง 3 ตัวจะถูกจัดการโดย createAsyncThunk 
        // โดยทำให้เราสามารถจัดการ loading case, error case แบบรวมกันได้ และ success case ให้จัดการแยกกันตาม action
        
        builder
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith("/fulfilled"), (state, action) => {
                state.loading = false;
                if (action.type.includes("fetchUsers")) {
                    state.users = action.payload;
                } else if (action.type.includes("fetchUser")) {
                    state.users = action.payload;
                } else if (action.type.includes("createUser")) {
                    state.users.push(action.payload);
                } else if (action.type.includes("editUser")) {
                    const index = state.users.findIndex((user) => user.id === action.payload.id);

                    if (index >= 0) {
                        state.users[index] = action.payload;
                    }
                } else if (action.type.includes("deleteUser")) {
                    state.users = state.users.filter((user) => user.id !== action.payload);
                }
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default userSlice.reducer;