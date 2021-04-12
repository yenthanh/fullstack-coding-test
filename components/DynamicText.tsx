import React, { useState, useImperativeHandle, forwardRef } from "react";

const DynamicText =  forwardRef((props, ref) => {
  const [value, setValue] = useState("Random Text");
  const [text, setText] = useState("");
  const changeValue = (newValue) => {
    setText(newValue);
  };
  useImperativeHandle(ref, () => {
    return {
      changeValue: changeValue,
    };
  });
  return (
    <>
      <h1>{value}</h1>
      <h1 style={{textAlign:"center", width:"100%"}}>{text}</h1>
    </>
  );
});

export default DynamicText;
