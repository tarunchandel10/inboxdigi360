import { useEffect, useState } from "react";
import { PersonFill } from 'react-bootstrap-icons';
import FormField from "@/component/Form/InputField";
import { useRouter } from "next/router";
import { createAdvertiser } from "../api/admin";
import { toast } from "react-toastify";

export default function CreateAdvertiserForm() {
    const [formValues, setFormValue] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        mobile: '',
        inital_budget: ''
    })
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState(false)

    const handleInputChange = (e) => {
        setTouched(true)
        const { name, value } = e.target;

        if (name === "mobile") {
            if (value.length < 11) {
                setFormValue({ ...formValues, [name]: value.replace(/[^0-9]/g, '') })
            }
        }
        else {
            setFormValue({ ...formValues, [name]: value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            createAdvertiser(formValues).then((data) => {
                if (data.status) {
                    toast.success(data.message)
                    setTimeout(() => {

                        router.push(`/admin/dashboard`);
                    }, 1000);
                }
                else {

                    toast.error(data.message)
                }
            }).catch((error) => {
                console.error(error)
            })
        }
    }
    useEffect(() => {

        if (touched) validateForm();
    }, [formValues])
    const validateForm = () => {
        let errors = {};
        console.log(formValues.fname)
        if (!formValues.fname) {
            errors.fname = true
        }
        if (!formValues.lname) {
            errors.lname = true
        }
        if (!formValues.email) {
            errors.email = true;
        }
        else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = true
        }

        if (!formValues.password) {
            errors.password = true
        }

        if (!formValues.mobile) {
            errors.mobile = true
        }
        else if (formValues.mobile.length > 10) {
            errors.mobile = true
        }
        if (!formValues.inital_budget) {
            errors.inital_budget = true
        }
        setErrors(errors);
        // setIsFormValid(Object.keys(errors).length === 0); 
    };
    return (
        <>
            <div className="create-form">
                <div className="container">
                    <div className="create-form-page">
                        <div className="create-form-img">
                            <img src="/images/ad-logo.png" alt="" />
                        </div>
                        <div className="create-form-hdng">
                            <h2>Create Advertiser</h2>
                            <p>For whatever matters most, make it easier for potential customers to find your business with AD 360 Global.</p>
                        </div>
                        <form className="create-form-box" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} className={`${errors.fname ? 'form-error' : ''}`} type="text" name="fname" placeholder="First Name" value={formValues.fname} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} className={`${errors.lname ? 'form-error' : ''}`} type="text" name="lname" placeholder="Last Name" value={formValues.lname} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} className={`${errors.email ? 'form-error' : ''}`} type="email" name="email" placeholder="Email" value={formValues.email} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} className={`${errors.password ? 'form-error' : ''}`} type="password" name="password" placeholder="Password" value={formValues.password} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} className={`${errors.mobile ? 'form-error' : ''}`} type="tel" name="mobile" placeholder="Mobile" value={formValues.mobile} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} className={`${errors.inital_budget ? 'form-error' : ''}`} type="text" name="inital_budget" placeholder="Initial Budget" value={formValues.inital_budget} required onChange={handleInputChange} />
                                </div>
                                <div className="create-form-btn">
                                    <button type="submit" className="btn">Create Advertiser</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
