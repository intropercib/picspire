import React, { useState, useEffect } from "react";
import { Grid2 as Grid } from "@mui/material";
import ProfilePost from "./ProfilePost";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";
import { useParams } from "react-router-dom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const ProfilePosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const userPostsQuery = query(
      collection(firestore, "posts"),
      where("authorUsername", "==", username),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(userPostsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(postsData);
    });
    return () => unsubscribe();
  }, [username]);

  return (
    <Grid
      container
      sx={{
        margin: "auto",
        width: {
          xs: "100%",
          sm: "90%",
          md: "80%",
          lg: "70%",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Object.values(userPosts).map((post) => (
        <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
          <ProfilePost post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfilePosts;
