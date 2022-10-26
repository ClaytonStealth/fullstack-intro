const BlogListCard = (props) => {
  const { blog } = props;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.text}</p>
    </div>
  );
};

export default BlogListCard;
