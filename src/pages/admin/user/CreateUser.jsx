import React from "react";
import CommonForm from "../../../components/common/CommonForm.jsx";

export default function CreateUser() {
  const fields = [
    { type: "text", label: "Name", name: "name", placeholder: "Enter name" },
    { type: "email", label: "Email", name: "email", placeholder: "Enter email" },
    { type: "text", label: "Phone", name: "phone", placeholder: "Enter phone" },
    {type:"password",label:"Password",name:"password",placeholder:"Enter Password"},
    { type: "text", label: "Job Title", name: "jobTitle", placeholder: "Enter job title" },
    {
      type: "select",
      label: "Role",
      name: "roleKey",
      options: [
        { label: "Admin", value: "ADMIN" },
        { label: "Sub Admin", value: "SUB_ADMIN" },
        { label: "Staff", value: "STAFF" },
      ],
    },
    { type: "text", label: "Department", name: "department", placeholder: "Enter department" },
  ];

  const handleSubmit = (data) => {
    console.log("User submitted:", data);
    alert(`User Created!\nName: ${data.name}\nEmail: ${data.email}`);
  };

  return <CommonForm title="Create User" fields={fields} onSubmit={handleSubmit} />;
}
