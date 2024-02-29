import { useState } from "react";
import { PersonFill } from 'react-bootstrap-icons';
import FormField from "@/component/Form/InputField";
import SelectField from "@/component/Form/SelectField";
import { createAdmin } from "../api/superadmin";
import { useRouter } from "next/router";

export default function CreateEditAdminForm({}) {
    const currency = ['Impression']
    const currencyType = ['USD', 'INR']
    const [formValues, setFormValue] = useState({
        fname: '',
        lname: '',
        domain_name: '',
        email: '',
        password: '',
        currency: '',
        currency_type: '',
        mobile: '',
        inital_budget: ''
    })
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "mobile") {
            if (value.length < 11) {
                setFormValue({ ...formValues, [name]: value.replace(/[^0-9]/g, '') })
            }
        }
        else{

            setFormValue({ ...formValues, [name]: value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createAdmin(formValues).then((data) => {
            router.push(`/superadmin/dashboard`);
        }).catch((error) => {
            console.error(error)
        })
    }
    return (
        <>
            <div className="create-form">
                <div className="container">
                    <div className="create-form-page">
                        <div className="create-form-img">
                            <img src="/images/ad-logo.png" alt="" />
                        </div>
                        <div className="create-form-hdng">
                            <h2>Create Admin</h2>
                            <p>For whatever matters most, make it easier for potential customers to find your business with AD 360 Global.</p>
                        </div>
                        <form className="create-form-box" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} type="text" name="fname" placeholder="First Name" values={formValues.fname} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} type="text" name="lname" placeholder="Last Name" values={formValues.lname} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-12">
                                    <FormField icon={<PersonFill />} type="text" name="domain_name" placeholder="Domain Name" values={formValues.domain_name} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} type="email" name="email" placeholder="Email" values={formValues.email} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} type="password" name="password" placeholder="Password" values={formValues.password} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <SelectField name="currency" value={formValues.currency} setValue={handleInputChange} options={currency} />
                                </div>
                                <div className="col-md-6">
                                    <SelectField name="currency_type" value={formValues.currency_type} setValue={handleInputChange} options={currencyType} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} type="text" name="mobile" placeholder="Mobile" values={formValues.mobile} required onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <FormField icon={<PersonFill />} type="text" name="inital_budget" placeholder="Initial Budget" values={formValues.inital_budget} required onChange={handleInputChange} />
                                </div>
                                <div className="create-form-btn">
                                    <button type="submit" className="btn">Create Admin</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
