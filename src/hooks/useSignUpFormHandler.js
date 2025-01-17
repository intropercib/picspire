import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../components/Firebase/firebase";

const useSignUpFormHandler = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        fullName: "",
        username: "",
    });

    const [errors, setErrors] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", severity: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        let hasError = false;

        if (!inputs.email.trim()) {
            newErrors.email = "Email is required";
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            newErrors.email = "Invalid email format";
            hasError = true;
        }

        if (!inputs.password.trim()) {
            newErrors.password = "Password is required";
            hasError = true;
        } else if (inputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            hasError = true;
        }

        if (!inputs.fullName.trim()) {
            newErrors.fullName = "Full name is required";
            hasError = true;
        }

        if (!inputs.username.trim()) {
            newErrors.username = "Username is required";
            hasError = true;
        }
        
        setErrors(newErrors);
        return !hasError;
    };

   

    return {
        inputs,
        handleInputChange,
        validate,
        errors,
        alertInfo,
        showAlert: (message, severity) => {
            setAlertInfo({ message, severity });
            setTimeout(() => setAlertInfo({ message: "", severity: "" }), 3000);
        },
    };
};

export default useSignUpFormHandler;
