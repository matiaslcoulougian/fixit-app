import { useState } from 'react';

export default function Form2() {

    // States for registration
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confEmail, setConfEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDoB] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setSubmitted(false);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    const handleConfEmail = (e) => {
        setConfEmail(e.target.value);
        setSubmitted(false);
    };

    const handleConfPassword = (e) => {
        setConfPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
        setSubmitted(false);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
        setSubmitted(false);
    };
    const handleDoB = (e) => {
        setDoB(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName === '' || email === '' || password === '' || lastName === '' || email !== confEmail || password !== confPassword) {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {firstName+ " "+ lastName} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <div class="form-label">
                <label className="label">First Name</label>
                <input onChange={handleFirstName} className="input"
                       value={firstName} type="text" />
                </div>

                <div className="form-label">
                <label className="label">Last Name</label>
                <input onChange={handleLastName} className="input"
                       value={lastName} type="text" />
                </div>

                <div className="form-label">
                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                       value={email} type="text" />
                </div>

                <div className="form-label">
                    <label className="label">Confirm Email</label>
                    <input onChange={handleConfEmail} className="input"
                           value={confEmail} type="text" />
                </div>

                <div className="form-label">
                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                       value={password} type="text" />
                </div>

                <div className="form-label">
                <label className="label">Confirm Password</label>
                <input onChange={handleConfPassword} className="input"
                       value={confPassword} type="text" />
                </div>

                <div className="form-label">
                <label className="label">Phone</label>
                <input onChange={handlePhone} className="input"
                       value={phone} type="text" />
                </div>

                <div className="form-label">
                <label className="label">Address</label>
                <input onChange={handleAddress} className="input"
                       value={address} type="text" />
                </div>
                <div className="form-label">
                <label className="label">Date of Birth</label>
                <input onChange={handleDoB} className="input"
                       value={dob} type="text" />
                </div>
                <div className="form-label">
                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
                </div>
            </form>
        </div>
    );
}