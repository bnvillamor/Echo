import React, { Fragment, useState } from "react";

const AddUser = () => {
    const [email, setEmail] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email };
            const response = await fetch("http://localhost:5000/user_info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Fragment>
                <h1 className="text-center mt-5">Add User</h1>
                <form className="flex mt-5" onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button className="btn btn-success">Add</button>
                </form>
            </Fragment>
        </div>
    );
}

export default AddUser;