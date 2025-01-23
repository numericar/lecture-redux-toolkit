import { BrowserRouter, useRoutes } from "react-router-dom"
import UserList from "../src/pages/UserList";
import UserEdit from "../src/pages/UserEdit";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <UserList />
    },
    {
      path: "/create",
      element: <UserEdit />
    },
    {
      path: "/edit/:id",
      element: <UserEdit />
    }
  ])

  return elements;
}

export default App
