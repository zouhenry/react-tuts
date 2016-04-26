ReactDOM.render(
  <CommentBox url="/api/comments.json" pollInterval={10000}/>,
  document.getElementById("root")
);