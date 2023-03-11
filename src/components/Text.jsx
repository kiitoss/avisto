import React from "react";

const Text = (props) => {
  const { text } = props;
  console.log(text);
  const paragraphs = text
    .replace(/\n+$/, "")
    .split("\n")
    .map((paragraph, index) => (
      <p key={index} className="block pb-4">
        {paragraph}
      </p>
    ));

  return <div>{paragraphs}</div>;
};

export default Text;
