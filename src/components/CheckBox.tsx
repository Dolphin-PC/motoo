import React from "react";

const CheckBox = ({ name, label }: { name: string; label: string }) => {
  return (
    <div>
      <input id={name} type="checkbox" className="mr-2 " />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default CheckBox;
