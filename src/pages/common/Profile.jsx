import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../services/profile/profileApi";
import { updateMyProfile } from "../../services/profile/updateProfileApi";
import { resetProfileUpdate } from "../../slices/profile/profileSlice";

export default function Profile() {
  const dispatch = useDispatch();

  // Destructure all needed state from profile slice
  const { profile, loading, error, updating, success } = useSelector(
    (state) => state.profile
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        jobTitle: profile.jobTitle || "",
        phoneExtension: profile.phoneExtension || "",
        departmentName: profile.departmentName || "",
      });
    }
  }, [profile]);

  // Handle success after update
  useEffect(() => {
    if (success) {
      setIsEditing(false);          // close edit mode
      dispatch(getMyProfile());     // refresh profile from backend
      dispatch(resetProfileUpdate()); // reset success flag
    }
  }, [success, dispatch]);

  if (loading) return <p className="text-center mt-6">Loading profile...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!profile) return null;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = () => {
    dispatch(updateMyProfile({ id: profile.id, data: formData }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Profile Details</h2>

      <div className="flex flex-col gap-4">
        {/* ID (read-only) */}
        <ProfileRow label="ID" value={profile.id} />

        {/* Name */}
        <ProfileRow
          label="Name"
          isEditing={isEditing}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Email (always read-only) */}
        <ProfileRow label="Email" value={profile.email} />

        {/* Job Title */}
        <ProfileRow
          label="Job Title"
          isEditing={isEditing}
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />

        {/* Phone Extension */}
        <ProfileRow
          label="Phone Extension"
          isEditing={isEditing}
          name="phoneExtension"
          value={formData.phoneExtension}
          onChange={handleChange}
        />

        {/* Status */}
        <ProfileRow
          label="Status"
          value={profile.status}
          className={profile.status === "ACTIVE" ? "text-green-600" : "text-red-600"}
        />

        {/* Role */}
        <ProfileRow label="Role" value={profile.roleName} />

        {/* Department */}
        <ProfileRow
          label="Department"
          isEditing={isEditing}
          name="departmentName"
          value={formData.departmentName}
          onChange={handleChange}
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded-lg"
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-dark transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Optional success message */}
      {success && <p className="text-green-600 mt-2">Profile updated successfully!</p>}
    </div>
  );
}

/* ---------- Reusable Row Component ---------- */
function ProfileRow({ label, value, isEditing = false, name, onChange, className = "" }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
      <span className="font-semibold text-gray-600">{label}:</span>

      {isEditing && name ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="border px-2 py-1 rounded-md w-1/2"
        />
      ) : (
        <span className={`text-gray-800 ${className}`}>{value || "N/A"}</span>
      )}
    </div>
  );
}
