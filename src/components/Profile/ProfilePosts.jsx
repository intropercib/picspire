import React, { useState, useEffect } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import ProfilePost from "./ProfilePost";
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
  const [loading, setLoading] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={118} />
  }

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
      {userPosts.length === 0 ? (
        <Typography
        component="p"
          sx={{
            textAlign: "center",
          }}
        >
          No posts to display.
        </Typography>
      ) : (
        Object.values(userPosts).map((post) => (
          <Grid key={post.id} xs={12} sm={6} md={4} lg={3}>
            <ProfilePost post={post} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProfilePosts;
