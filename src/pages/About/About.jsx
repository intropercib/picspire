import React, { useEffect, useRef } from "react";
import { Container, Typography, Link } from "@mui/material";
import { initAnimation } from "./animationEngine";

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup;
    if (canvasRef.current) {
      cleanup = initAnimation(canvasRef.current);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const commonStyles = {
    m: 2,
    fontSize: "0.875rem",
    fontWeight: "normal",
    letterSpacing: "0.5px",
    p: 1,
    userSelect: "none",
    textAlign: "center",
  };

  return (
    <>
      <Container
        sx={{
          padding: "20px",
          textAlign: "center",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          About Us
        </Typography>
        <Typography
          variant="h3"
          sx={{
            ...commonStyles,
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Welcome to <strong>PicSpire</strong>, your go-to social media platform
          for capturing and sharing life's most inspiring moments. PicSpire is
          designed to help you connect with friends, discover creative content,
          and share your unique perspective with the world through stunning
          photos.
        </Typography>
        <Typography variant="h3" sx={commonStyles}>
          Created with passion and dedication by{" "}
          <strong style={{ color: "#64b5f6" }}>Bigyan Nepali</strong>, PicSpire
          is a project that emphasizes simplicity, innovation, and a seamless
          user experience. Whether you're here to explore, create, or connect,
          PicSpire is built to inspire every step of your journey.
        </Typography>
        <Typography
          variant="h3"
          sx={{
            ...commonStyles,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          To learn more about the developer and discover other exciting
          projects, visit the GitHub profile below:
        </Typography>
        <Link
          href="https://github.com/intropercib"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#64b5f6",
            textDecoration: "none",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            "&:hover": {
              color: "#90caf9",
            },
          }}
        >
          Visit GitHub Profile
        </Link>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            background: "transparent",
            pointerEvents: "none",
          }}
        />
      </Container>
    </>
  );
};

export default About;
