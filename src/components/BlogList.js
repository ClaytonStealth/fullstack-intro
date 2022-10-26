import BlogListCard from "./BlogListCard";

const BlogList = (props) => {
  const { blogs } = props;
  return (
    <div>
      {blogs.map((blog) => {
        return <BlogListCard blog={blog} key={blog.id} />;
      })}
    </div>
  );
};

export default BlogList;
