const CommentList = ({ comments }) => {
  return (
    <div className="d-flex flex-wrap flex-column justify-content-evenly mx-2">
      <h5>
        {comments.length > 0
          ? `${comments.length} comment${comments.length == 1 ? "" : "s"}`
          : "No comments"}
      </h5>
      <ul>
        {comments.length > 0 &&
          comments.map((cmnt) => <li key={cmnt.id}>{cmnt.content}</li>)}
      </ul>
    </div>
  );
};

export default CommentList;
