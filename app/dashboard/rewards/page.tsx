import { SearchIcon } from "lucide-react";
export default function Page() {
    return (
    <main className="bg-gradient-to-b from-yellow-100 to-green-300 min-h-screen flex-col ">
        <h1 className="font-semibold mx-5 my-7 text-3xl">Total Points:</h1>
        <form className="w-[500px] relative">
        <div className="relative mx-6">
  <input
    type="search"
    placeholder="Search your reward"
    className="rounded-full w-full p-4 pr-12 shadow-lg" // Adjust padding-right to make space for the icon
  />
  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-400 transition">
    <SearchIcon />
  </button>
  </div>
  </form>
  <div  className="mt-5 mx-7">
  <div className="w-full bg-blue-200 rounded-lg px-3 py-2 text-lg">
  Clothing Discount: "Get 20% Off on All Items at Fashion Street, Grand Mall."
  </div>

  </div>
    
    </main>
    
);
  }