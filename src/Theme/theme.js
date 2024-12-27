import { createTheme } from "@mui/material/styles";

const darkModeTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#B3B3B3",
        },
        secondary: {
            main: "#0095f6",

        },
        background: {
            default: "#000000",
            primary:"#1E1E1E",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#B3B3B3",
        },
        warning: {
            main: "#FF0000",
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontSize: "2rem",
            fontWeight: 700,
        },
        h2: {
            fontSize: "1.75rem",
            fontWeight: 600,
        },
        h3: {
            fontSize: "0.875rem",
            fontWeight: "lighter",
        },
        h4:{
            fontSize: "1rem",
            fontWeight: 500,
        },
        h6: {
            fontSize: ".7rem",
            color: "#B3B3B3",
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
        },
        body2: {
            fontSize: "0.875rem",
            color: "#B3B3B3",
        },

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#B3B3B3",
                    fontSize: "1rem",
                    backgroundColor: "#0095f6",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                },
            },
        },
    },
});

export default darkModeTheme;