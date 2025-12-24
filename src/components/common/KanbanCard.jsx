import React from "react";

export default function KanbanCard({
  id,
  customer_id,
  department_id,
  name,
  firstname,
  lastname,
  email,
  role,
  service,
  phone,
  createdOn,
  status,
  source,
  assigned_to,

}) {
  // Assign static color based on status
  let statusColor = "";
  if (status === "New") statusColor = "bg-[#00A3A3]";       
  else if (status === "Contacted") statusColor = "bg-[#F5B400]"; 
  else if (status === "Lost") statusColor = "bg-[#EF7D7D]";     

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">#{id} {name} {firstname} {lastname}</p>
        
        {/* <p className="font-bold text-lg">#{id} {email}</p> */}
        <span className={`px-3 py-1 text-white rounded-full text-xs ${statusColor}`}>
          {status}
          
        </span>
      </div>
      <p className="text-sm ">Cust Id - {customer_id}</p>
      <p className="text-sm ">Dept Id - {department_id}</p>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">{role}</p>
      <p className="text-sm text-gray-600">{source}</p>
      <p className="text-sm text-gray-600">{assigned_to}</p>
      <p className="text-sm text-gray-600">{service}</p>
      <p className="text-sm">📞 {phone}</p>
      <p className="text-xs text-gray-500 mt-1">Created on: {createdOn}</p>
    </div>
    
  );
}
