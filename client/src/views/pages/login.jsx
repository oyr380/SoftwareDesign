import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import showPwdImg from '../assets/show-password.png';
import hidePwdImg from '../assets/hide-password.png';
import {Row} from "react-bootstrap";
import "../css/Form.css"
import {loginUser} from "../../services/authService";

const LoginPage = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // todo two onChange events in same input? 2/23: const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await loginUser(user);
        console.log(response.data);
        setUser({
            email: '',
            password: '',
        });
    }

    return(
        <div className="text-center container col-11, mt-5 ">
            <form onSubmit={handleSubmit} className="form mt-5">
                <h2>Please Log In</h2>
                <Row>
                    <label>
                        <input
                            className="form-control mt-4"
                            onChange={handleChange}
                            name="email"
                            value={user.email}
                            type="text"
                            placeholder="email"
                        />
                    </label>
                    <label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            name="password"
                            value={user.password}
                            type={isRevealPwd ? "text" : "password"}
                            placeholder="password"
                            // todo see above value={pwd}
                            // todo see above onChange={e => setPwd(e.target.value)}
                        />
                        <img
                            title={isRevealPwd ? "Hide password" : "Show password"}
                            src={isRevealPwd ? showPwdImg : hidePwdImg}
                            onClick={() => setIsRevealPwd(prevState => !prevState)}
                        />
                    </label>
                    <div >
                        <button style={{height:40}} className="btn btn-outline-secondary btn-outline-success mt-4">Submit</button>
                        <Link to="/" style={{ textDecoration: 'none' }}><button style={{height:40}} className="btn btn-outline-secondary mt-4">Return</button></Link>
                    </div>
                    <Link to="/register"><p className="mt-3">Don't have an account?</p></Link>
                </Row>
            </form>
        </div>
    )
}

export default LoginPage;