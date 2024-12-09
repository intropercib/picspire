import { useState } from "react";

const useLoginFormHandler = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

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
        }

        if (!inputs.password.trim()) {
            newErrors.password = "Password is required";
            hasError = true;
        }


        setErrors(newErrors);
        return !hasError;
    };

    return {
        inputs,
        errors,
        validate,
        handleInputChange
    };
};

export default useLoginFormHandler;
