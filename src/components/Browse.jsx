import Header from "./Header";

const Browse = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-4xl font-bold">
          Welcome to Watchly 🎬
        </h1>
      </div>
    </div>
  );
};

export default Browse;