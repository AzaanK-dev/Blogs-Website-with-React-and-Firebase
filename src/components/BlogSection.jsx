import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { AddBlog } from "./AddBlog";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/ContextProvider";

function BlogCard({ img, title, desc }) {
  return (
    <Card
      className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:shadow-black/40"
      color="transparent"
      data-aos="fade-up"
    >
      <img
        src={img}
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <CardBody className="relative flex flex-col justify-end">
        <Typography variant="h4" color="white">
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          color="white"
          className="my-2 font-normal"
        >
          {desc}
        </Typography>
      </CardBody>
    </Card>
  );
}

export function BlogSection() {
  const { blogPosts, showModal, setShowModal } = useContext(context);
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-8 py-2 lg:py-20 flex flex-col items-center">
      <Typography
        variant="h2"
        color="blue-gray"
        className="!text-3xl !leading-snug lg:!text-6xl xs:!text-xl font-black mt-8 md:mt-6 lg:mt-4 xl:mt-4"
        data-aos="fade-down"
      >
        Your Voice. Your Vision.
      </Typography>

      <Typography
        variant="lead"
        className="mt-5 max-w-lg !font-normal !text-gray-500 text-center"
        data-aos="fade-down"
        data-aos-delay="150"
      >
        We're constantly trying to express ourselves and actualize our dreams.
        If you have the opportunity to play this game of life you need to appreciate every moment.
      </Typography>

      <Button
        onClick={() => setShowModal(true)}
        aria-label="Upload a new blog"
        className="flex items-center gap-3 mt-4 bg-[#0296D8] text-white hover:opacity-80 transition"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        Upload Blog
      </Button>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Link to={`/blogdetail/${post.id}`} onClick={() => scrollTo(0, 0)} key={index}>
            <div data-aos="fade-up" data-aos-delay={`${index * 100}`}>
              <BlogCard
                img={post.imageUrl}
                title={post.title.slice(0, 24) + ".."}
                desc={post.description.slice(0, 125) + " ...."}
              />
            </div>
          </Link>
        ))}
      </div>

      {showModal && <AddBlog onClose={() => setShowModal(false)} />}
    </section>
  );
}

export default BlogSection;
