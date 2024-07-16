import React from "react";

const Form = ({
  type,
  commentId,
  handleFormSubmit,
  setInputVal,
  inputVal,
  setNestedInputVal,
  NestedinputVal,
}) => {
  return (
    <form
      onSubmit={(e) => handleFormSubmit(e, commentId)}
      className="Input-form"
    >
      <input
        type="text"
        name="comment"
        placeholder="Type your comment here.."
        value={type === "nested" ? NestedinputVal : inputVal}
        onChange={(e) =>
          type === "nested"
            ? setNestedInputVal(e.target.value)
            : setInputVal(e.target.value)
        }
      />
      <button>Add Comment</button>
    </form>
  );
};

export default Form;
