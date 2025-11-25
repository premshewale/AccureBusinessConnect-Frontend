import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // Extract error info safely
  const status = error?.status || 500;
  const message =
    error?.statusText ||
    error?.message ||
    "Something went wrong. Please try again.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">

        <h1 className="text-7xl font-extrabold text-blue-600">
          {status}
        </h1>

        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          {message}
        </h2>

        <p className="text-gray-500 mt-2">
          The page you're looking for might be removed or temporarily unavailable.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Refresh
          </button>
        </div>

        {/* Detailed debug error: Only shown in development */}
        {import.meta.env.DEV && (
          <pre className="mt-6 text-left text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto text-red-600">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
