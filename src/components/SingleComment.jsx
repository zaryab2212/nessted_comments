import React, { useEffect, useState } from "react";
import Form from "./Form";

const SingleComment = ({
  comment,
  setIsVisible,
  handleFormSubmit,
  setNestedInputVal,
  NestedinputVal,
  handleVoteChange,
  handleEdit,
  handleNested,
  type,
  setType,
  handleNestedForm,
  openedForm,
  setOpenForn,
  handleRemove,
}) => {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="">
      {comment && (
        <div className="appWala">
          {" "}
          <h3>{comment.comment}</h3>
          <p>Votes: {comment.Votes}</p>
          <p>{comment.date}</p>
          <div>
            <button onClick={() => handleVoteChange(comment.id, "up")}>
              👍
            </button>
            <button onClick={() => handleVoteChange(comment.id, "down")}>
              👎
            </button>
            <button onClick={() => handleNested(comment, comment.id)}>
              Reply
            </button>
            <button onClick={() => handleEdit(comment, type)}>Edit</button>
            <button onClick={() => handleRemove(comment)}>Delete</button>
          </div>
        </div>
      )}

      {comment.isVisible && (
        <div className="nested">
          {comment.isVisible && comment.id === openedForm && (
            // <form onSubmit={handleNestedForm}>
            //   <input
            //     type="text"
            //     placeholder="write comment here.."
            //     value={NestedinputVal}
            //     onChange={(e) => setNestedInputVal(e.target.value)}
            //   />
            //   <button>Add Comment</button>
            // </form>
            <div style={{ paddingLeft: "1rem" }}>
              <Form
                commentId={comment}
                handleFormSubmit={handleFormSubmit}
                setNestedInputVal={setNestedInputVal}
                NestedinputVal={NestedinputVal}
                type={"nested"}
              />
            </div>
          )}
          {comment.isVisible && (
            <div>
              {comment.replies.length > 0 &&
                comment.replies.map((e) => {
                  return (
                    <>
                      <SingleComment
                        comment={e}
                        setOpenForn={setOpenForn}
                        openedForm={openedForm}
                        handleEdit={handleEdit}
                        NestedinputVal={NestedinputVal}
                        setNestedInputVal={setNestedInputVal}
                        setIsVisible={setIsVisible}
                        handleNested={handleNested}
                        handleVoteChange={handleVoteChange}
                        handleFormSubmit={handleFormSubmit}
                        handleNestedForm={handleNestedForm}
                        handleRemove={handleRemove}
                        type={"nested"}
                      />
                    </>
                  );
                })}{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleComment;
