import * as Yup from "yup";

export const signUpSchema = Yup.object({
    restaurantName:Yup.string().min(2).max(25).required("Please Enter Your Restaurant Name"),
    // lastName:Yup.string().min(2).max(25).required("Please Enter Your Last Name"),
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).required("Please Enter Your Password"),
    address:Yup.string().min(10).required("Please Enter Your Address"),
    city:Yup.string().min(4).required("Please Enter Your City Name"),
    zip:Yup.number().required().positive().integer().required("Please Enter Your Zip Code")
})

const phoneRegExp = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
export const signUpUser = Yup.object({
    userName:Yup.string().min(2).max(25).required("Please Enter Your UserName"),
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).required("Please Enter Your Password"),
    address:Yup.string().min(10).required("Please Enter Your Address"),
    city:Yup.string().min(4).required("Please Enter Your City Name"),
    zip:Yup.number().required().positive().integer().required("Please Enter Your Zip Code"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
})

export const logInSchema = Yup.object({
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).required("Please Enter Your Password"),
})