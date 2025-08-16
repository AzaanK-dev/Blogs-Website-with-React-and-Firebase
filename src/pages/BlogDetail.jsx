import { Typography, Button, Spinner } from "@material-tailwind/react";
import { EditBlog } from "../components/EditBlog";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../context/ContextProvider";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

export function BlogDetail() {
  const { id } = useParams();
  const {
    blogPosts,
    setBlogPosts,
    isLoading,
    setIsLoading,
    showModal,
    setShowModal,
  } = useContext(context);
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Fetch blog if not already in context
  useEffect(() => {
    const foundBlog = blogPosts.find((item) => item.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      const fetchBlog = async () => {
        setIsLoading(true);
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBlog({ id: docSnap.id, ...docSnap.data() });
          } else {
            toast.error("Blog not found");
            navigate("/");
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id, blogPosts, navigate, setIsLoading]);


  const deleteHandler = (dc) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    deleteDoc(doc(db, "blogs", dc.id))
      .then(() => {
        setBlogPosts((prev) => prev.filter((item) => item.id !== dc.id));
        setIsLoading(false);
        navigate("/");
        toast.success("Blog deleted successfully!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  if (isLoading || !blog) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[2rem]">
      <Navbar />
      <section className="p-8">
        <div
          className="mx-auto max-w-screen-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src={blog.imageUrl}
            alt="team work"
            className="mb-2 h-[28rem] w-full rounded-2xl object-cover"
            data-aos="zoom-in"
            data-aos-delay="100"
          />

          <div
            className="flex flex-col sm:flex-row justify-between sm:items-center mb-2"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <Typography variant="small" className="font-black text-lg">
              By {blog.author}
            </Typography>
            <Typography variant="small" className="font-black text-lg">
              Published: {blog.date.slice(4)}
            </Typography>
          </div>

          <Typography
            variant="small"
            className="font-medium !text-blue-500"
            data-aos="fade"
            data-aos-delay="200"
          >
            #blog #post
          </Typography>

          <Typography
            variant="h2"
            color="blue-gray"
            className="my-4 font-black text-4xl !leading-snug"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {blog.title}
          </Typography>

          <Typography
            className="font-normal !text-gray-500"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {blog.description}
          </Typography>

          <hr
            className="border-t-4 border-blue-gray-500 my-4"
            data-aos="fade-in"
            data-aos-delay="300"
          />

          <div
            className="flex justify-end gap-3 mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Button
              type="button"
              className="px-4 py-2 bg-[green]"
              onClick={() => setShowModal(true)}
            >
              Edit
            </Button>
            <Button
              type="button"
              className="px-4 py-2 bg-[red]"
              onClick={() => deleteHandler(blog)}
            >
              Delete
            </Button>
          </div>
        </div>
      </section>
      {showModal && (
        <EditBlog onClose={() => setShowModal(false)} blogToEdit={blog} />
      )}
    </div>
  );
}
