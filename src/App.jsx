import React, { useState } from "react";
import { commentsArr } from "./constants";
import CommentsComponet from "./components/CommentsComponet";
import "./App.css";

const App = () => {
  const [comments, setComments] = useState(commentsArr);
  const [openedForm, setOpenForn] = useState(null);

  // Nested Compoents
  const handleNested = (comment, open) => {
    let data = comments.map((e) => JSON.parse(JSON.stringify(e)));
    setOpenForn(open);
    function MakeVisible(comments, id) {
      let newList = comments;
      return newList.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            isVisible: !e.isVisible,
          };
        } else if (e.replies && e.replies.length > 0) {
          return { ...e, replies: MakeVisible(e.replies, id) };
        }

        return e;
      });
    }

    let UpdateVisible = MakeVisible(data, comment.id);
    setComments(UpdateVisible);
  };

  return (
    <div>
      <h1> Now write Nested Comments</h1>

      <div className="main">
        <CommentsComponet
          handleNested={handleNested}
          setComments={setComments}
          comments={comments}
          setOpenForn={setOpenForn}
          openedForm={openedForm}
        />
      </div>
    </div>
  );
};

export default App;
