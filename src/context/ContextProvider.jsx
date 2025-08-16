import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getBlogs = async () => {
    setIsLoading(true);
    const emptyArray = [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      emptyArray.push({ ...doc.data(), id });
    });
    setBlogPosts(emptyArray);
    setIsLoading(false);
  };

  useEffect(() => {
    if (blogPosts.length === 0) {
      getBlogs();
    }
  }, []);
  

  const values = {blogPosts, setBlogPosts, isLoading, setIsLoading, showModal, setShowModal}
  return <context.Provider value={values}lue>{children}</context.Provider>;
};
