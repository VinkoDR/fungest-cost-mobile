import { useState } from "react";

export const useForm = (callBack, initialState) => {
  const [values, setValues] = useState(initialState);

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  return {
    onChange,
    values,
  };
};
