import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../Components/ProfileForm";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    fetch(
      `https://web.ics.purdue.edu/~park1843/new-project/fetch-data-with-id.php?id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, [id]);
  const handleDelete = () => {
    if(!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }
    fetch(
      `https://web.ics.purdue.edu/~park1843/new-project/delete-profile.php?id=${id}`,
      {
        method: "DELETE",
      }
    ).then((data) => data.json())
    .then((data) => {
      if(data.error) {
        alert(data.error);
      } else {
        alert("Profile Deleted");
        navigate("/");      
      }
    });
  };

  return (
    <Wrapper>
      <h1>Edit Profile</h1>
      <ProfileForm isEdit={true} currentProfile={profile}/>
      <button onClick={handleDelete} style={{margin: "3rem auto 0", display: "block"}}>Delete Profile</button>
    </Wrapper>
  );
};

export default ProfileEdit;