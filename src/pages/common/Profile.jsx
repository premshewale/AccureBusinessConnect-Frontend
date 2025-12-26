import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../services/profile/profileApi";

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-6">Loading profile...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!profile) return null;

  const profileFields = [
    { label: "ID", value: profile.id },
    { label: "Name", value: profile.name },
    { label: "Email", value: profile.email },
    { label: "Job Title", value: profile.jobTitle },
    { label: "Phone Extension", value: profile.phoneExtension || "N/A" },
    {
      label: "Status",
      value: profile.status,
      className: profile.status === "ACTIVE" ? "text-green-600" : "text-red-600",
    },
    { label: "Role", value: profile.roleName },
    { label: "Department", value: profile.departmentName },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Profile Details</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-3">
          {profileFields.map((field, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="font-semibold text-gray-600">{field.label}:</span>
              <span className={`text-gray-800 ${field.className || ""}`}>
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-6 flex justify-end">
        <button className="px-5 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-dark transition">
          Edit Profile
        </button>
      </div> */}
    </div>
  );
}
