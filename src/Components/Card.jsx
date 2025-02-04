import styles from "../styles/Card.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Card = ({ img, name, title, email }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 300);
    }, []);

    return (
        <div className={`${styles.profileCard} ${isVisible ? styles.fadeIn : ""}`}>
            <div className={styles.profileCardImage}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.profileCardContent}>
                <p className={styles.profileCardName}>{name}</p>
                <p className={styles.profileCardTitle}>{title}</p>
                <p className={styles.profileCardEmail}>
                    <a href={`mailto:${email}`}>{email}</a>
                </p>
            </div>
        </div>
    );
};

Card.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default Card;
