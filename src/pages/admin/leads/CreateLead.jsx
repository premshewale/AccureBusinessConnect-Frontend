import CommonForm from "../../../components/common/CommonForm.jsx";

export default function CreateLead() {
  const fields = [
    { type: "text", label: "Name", name: "name", placeholder: "Enter name" },
    { type: "email", label: "Email", name: "email", placeholder: "Enter email" },
    { type: "text", label: "Phone", name: "phone", placeholder: "Enter phone" },
  ];

  const handleSubmit = (data) => {
    console.log("Lead submitted:", data);
  };

  return <CommonForm title="Create Lead" fields={fields} onSubmit={handleSubmit} />;
}
