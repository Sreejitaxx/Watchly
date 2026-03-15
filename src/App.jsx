import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import AISearch from "./pages/AISearch";
import Body from "./components/Body";
import SignIn from "./components/SignIn";
import Browse from "./pages/Browse";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
  path: "/movie/:id",
  element: <MovieDetails />,
},
   {
  path: "/ai",
  element: <AISearch />,
}
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;