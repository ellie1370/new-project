import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../Components/Wrapper";


const ProfileDetail = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~park1843/new-project/fetch-data-with-id.php?id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Profile not found");
        }
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError(error.message);
        setProfile(null);
      });
  }, [id]);

  return (
    <Wrapper>
      {error ? (
        <p className="error-message">{error}</p>
      ) : Object.keys(profile).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{profile.name}</h1>
          <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p>{profile.bio}</p>
          {profile.image_url && <img src={profile.image_url} alt={profile.name} />}
        </>
      )}
    </Wrapper>
  );
};

export default ProfileDetail;
