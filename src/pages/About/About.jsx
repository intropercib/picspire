import { Container, Typography, Link } from "@mui/material";

const About = () => {
  const commonStyles = {
    m: 2,
    color: "text.secondary",
    fontSize: "0.875rem",
    fontWeight: "normal",
    letterSpacing: "0.5px",
    p: 1,
    userSelect: "none",
    textAlign: "center",
  };

  return (
    <Container
      sx={{
        padding: "20px",
        textAlign: "center",
        margin: "auto",
        border: "2px solid red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: "100%",
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography
        variant="h3"
        sx={{ ...commonStyles, borderTop: "1px solid", borderColor: "divider" }}
      >
        Welcome to <strong>PicSpire</strong>, your go-to social media platform
        for capturing and sharing life's most inspiring moments. PicSpire is
        designed to help you connect with friends, discover creative content,
        and share your unique perspective with the world through stunning
        photos.
      </Typography>
      <Typography variant="h3" sx={commonStyles}>
        Created with passion and dedication by{" "}
        <strong style={{ color: "#2980b9" }}>"Bigyan Nepali"</strong>, PicSpire
        is a project that emphasizes simplicity, innovation, and a seamless user
        experience. Whether you're here to explore, create, or connect, PicSpire
        is built to inspire every step of your journey.
      </Typography>
      <Typography
        variant="h3"
        sx={{ ...commonStyles, borderBottom: "1px solid", borderColor: "divider" }}
      >
        To learn more about the developer and discover other exciting projects,
        visit the GitHub profile below:
      </Typography>
      <Link
        href="https://github.com/intropercib"
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
