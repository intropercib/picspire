import { Container, Typography, Link } from "@mui/material";

const About = () => {
  return (
    <Container
      sx={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "#2c3e50" }}
      >
        About Us
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "18px", lineHeight: "1.6" }}
      >
        Welcome to <strong>InstaClone</strong>, the ultimate social media
        platform to share your cherished moments with friends and family. Our
        mission is to provide a seamless and enjoyable experience for users to
        connect and share their lives through stunning photos and engaging
        videos.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "18px", lineHeight: "1.6" }}
      >
        This project was crafted with passion by #, a
        dedicated developer committed to building intuitive and user-friendly
        applications. Discover more about the creator and explore other exciting
        projects on GitHub:
      </Typography>
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "#2980b9", textDecoration: "none", fontWeight: "bold" }}
      >
        Visit GitHub Profile
      </Link>
    </Container>
  );
};

export default About;
