import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./components/Browse";
import Body from "./components/Body";
import SignIn from "./components/SignIn";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
    {
  path: "/browse",
  element: <Browse />
},
    {
      path: "/signin",
      element: <SignIn />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
