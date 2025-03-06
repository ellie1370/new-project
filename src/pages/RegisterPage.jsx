import Wrapper from "../Components/Wrapper";
import AuthForm from "../Components/AuthForm";

const RegisterPage = () => {

    return (
        <Wrapper>
            <h1>Register</h1>
            <AuthForm isRegister={true} />
        </Wrapper>
    );
}

export default RegisterPage;