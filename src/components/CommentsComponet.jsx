import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import Form from "./Form";

const CommentsComponet = ({
  comments,
  setComments,
  allComments,
  handleNested,
  commentId,
  openedForm,
  setOpenForn,
}) => {
  //   const [isVisible, setIsVisible] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [NestedinputVal, setNestedInputVal] = useState("");
  const [type, setType] = useState("");
  const [editMode, setEditMode] = useState(null);

  //form Submission
  const handleFormSubmit = (e, cId) => {
    e.preventDefault();
    //checing input val is from main input and sett main comment
    if (!cId) {
      let updatedData = comments.map((e) => JSON.parse(JSON.stringify(e)));
      setComments([
        {
          id: Date.now() * Math.random() * 3 + Math.random() * 2,
          comment: inputVal,
          Votes: 0,
          date: Date.now(),
          replies: [],
        },
        ...updatedData,
      ]);
    } else {
      // if input if comment is typed from nessted componet nessted commmetn is set
      let data = comments.map((e) => JSON.parse(JSON.stringify(e)));

      if (editMode) {
        function EditComment(newList, id, comment) {
          return newList.map((e) => {
            console.log(e.id, id);
            if (e.id === id) {
              return {
                ...e,
                comment: comment,
                replies: [...e.replies],
              };
            } else if (e.replies && e.replies.length > 0) {
              return { ...e, replies: EditComment(e.replies, id, comment) };
            }
            return e;
          });
        }
        let updateComment = EditComment(data, editMode, NestedinputVal);
        setComments(updateComment);
        setEditMode(false);
      } else {
        console.log(cId);

        let updatedList = addComment(data, cId.id, NestedinputVal);
        setComments(updatedList);
        setEditMode(null);
      }
    }

    setNestedInputVal("");
    setInputVal("");

    //tree traversal function for adding nested compoents//////////////////////////////;
    function addComment(newList, id, comment) {
      return newList.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            replies: [
              ...e.replies,
              {
                id: Date.now() * Math.random() * 3 + Math.random() * 2,
                comment: comment,
                Votes: 0,
                date: Date.now(),
                replies: [],
              },
            ],
          };
        } else if (e.replies && e.replies.length > 0) {
          return { ...e, replies: addComment(e.replies, id, comment) };
        }
        return e;
      });
    }
    setNestedInputVal("");
  };

  const handleVoteChange = (id, type) => {
    function VoteChange(newList, id, type) {
      return newList.map((e) => {
        if (e.id === id && type === "up") {
          console.log("Upwala");
          return {
            ...e,
            Votes: e.Votes + 1,
          };
        }
        if (e.id === id && type === "down") {
          console.log("down");

          return {
            ...e,
            Votes: e.Votes - 1,
          };
        } else if (e.replies && e.replies.length > 0) {
          return { ...e, replies: VoteChange(e.replies, id, type) };
        }
        return e;
      });
    }
    let data = comments.map((e) => JSON.parse(JSON.stringify(e)));

    let VotedData = VoteChange(data, id, type);
    console.log(VotedData);
    setComments(VotedData);
  };

  const handleEdit = (commet, type) => {
    setNestedInputVal(() => commet.comment);
    setEditMode(commet.id);
  };

  const handleRemove = (comment) => {
    let data = comments.map((e) => JSON.parse(JSON.stringify(e)));

    function RemoveComment(newList, id) {
      return newList.reduce((accu, cmt) => {
        console.log(cmt.id, id);
        if (cmt.id === id) {
          return accu;
        } else if (cmt.replies && cmt.replies.length > 0) {
          cmt.replies = RemoveComment(cmt.replies, id);
        }
        return [...accu, cmt];
      }, []);
    }

    let removedData = RemoveComment(data, comment.id);
    console.log(removedData);
    setComments(removedData);
  };

  return (
    <div className="inner">
      {/* input form */}
      <Form
        commentId={commentId}
        handleFormSubmit={handleFormSubmit}
        setInputVal={setInputVal}
        inputVal={inputVal}
      />

      {/* Comments Array Data */}
      {comments &&
        comments.length > 0 &&
        comments?.map((comt) => (
          <div className="innerColor">
            {" "}
            <SingleComment
              inputVal={inputVal}
              type={type}
              setType={setType}
              key={comt.id}
              comment={comt}
              handleEdit={handleEdit}
              handleVoteChange={handleVoteChange}
              handleNested={handleNested}
              handleFormSubmit={handleFormSubmit}
              NestedinputVal={NestedinputVal}
              setNestedInputVal={setNestedInputVal}
              openedForm={openedForm}
              setOpenForn={setOpenForn}
              handleRemove={handleRemove}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentsComponet;
