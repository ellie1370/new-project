import { useState } from "react";

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        email: "",
        bio: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://your-web-space-url/send-data.php", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Submit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProfileForm;
