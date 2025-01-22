import img from '../assets/girl-cartoon.jpg';
import '../styles/card.css';

const Card2 = () => {
    const name = 'Lily Smith';
    const title= 'Software Engineer';
    const email= 'b@b.com';

    return  (
        <div className= "profile-card">
            <div className = "profile-card__image">
                <img src = {img} alt = {name} />
            </div>
            <div className= "profile-card__content"> 
                <p>{name}</p>
                <p>{title}</p>
                <p><a href= {'mailto:${email}'}>{email}</a></p>
            </div>

        </div>
    );
}
export default Card2; 