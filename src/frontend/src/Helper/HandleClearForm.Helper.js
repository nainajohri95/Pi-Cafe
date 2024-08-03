export const HandleClearForm = (setFormData, setErrorMsg) => {
    setFormData(prevForm => {
        const newForm = {};
        Object.keys(prevForm).forEach(key => {
            if(key !== "Role")
            newForm[key] = "";
        });
        return newForm;
    });

    setErrorMsg(prevError=>{
        const newErrors = {};
        Object.keys(prevError).forEach(key=>{
            newErrors[key] = "";
        })
        return newErrors
    })
    
};
