import React from "react";

const Text = (props) => {
  let { text } = props;

  if (text == "true") {
    text = "Oui";
  } else if (text == "false") {
    text = "Non";
  }

  const paragraphs = text
    ?.replace(/\n+$/, "")
    .split("\n")
    .map((paragraph, index) => (
      <p key={index} className="block pb-4">
        {paragraph}
      </p>
    ));

  return <div>{paragraphs}</div>;
};

export default Text;
