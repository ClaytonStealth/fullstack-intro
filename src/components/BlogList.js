import BlogListCard from "./BlogListCard";

const BlogList = (props) => {
  const { blogs } = props;
  return (
    <div>
      {blogs.map((blog, index) => {
        return <BlogListCard blog={blog} key={index} />;
      })}
    </div>
  );
};

export default BlogList;
