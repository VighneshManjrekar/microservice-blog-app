import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

const App = () => {
  return (
    <main className="container my-5">
      <PostCreate />
      <hr className="border border-primary border-2 opacity-100 my-3" />
      <PostList />
      <ToastContainer />
    </main>
  );
};

export default App;
