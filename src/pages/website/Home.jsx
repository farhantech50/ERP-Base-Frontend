import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-black tracking-tight text-gray-900">
          Welcome to <span className="text-primary-600">ERP Base</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          A generic, highly scalable Enterprise Resource Planning base template. 
          Manage your users, roles, and system configurations with ease.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/login"
            className="rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-500 transition"
          >
            Access Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
