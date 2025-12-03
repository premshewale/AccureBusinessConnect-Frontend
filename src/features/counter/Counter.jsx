import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Simple Counter
        </h2>

        <p className="text-gray-600 mb-6">
          Click the buttons below to increase or decrease the count.
        </p>

        <div className="flex items-center justify-center gap-6">
          {/* Decrement Button */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>

          {/* Count Display */}
          <span className="text-3xl font-bold text-gray-900 w-12 text-center">
            {count}
          </span>

          {/* Increment Button */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
