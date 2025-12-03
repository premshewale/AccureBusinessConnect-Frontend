import CommonForm from "../../../components/common/CommonForm.jsx";

export default function CreateContact() {
  const fields = [
    { 
      type: "select",
      label: "Priority",
      name: "priority",
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ]
    },
    { type: "email", label: "Email", name: "email", placeholder: "Enter email" },
    { type: "text", label: "Phone", name: "phone", placeholder: "Enter phone" },
  ];

  const handleSubmit = (data) => {
    console.log("Lead submitted:", data);
  };

  return <CommonForm title="Create Contact" fields={fields} onSubmit={handleSubmit} />;
}
