import React, { useRef,useState } from 'react'
import { Card, Form, Button , Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Login() {
    const emailRef = useRef();
    const PasswordRef = useRef();
    const {login } = useAuth();
    // const currentUser = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        // { currentUser && currentUser.email}
       
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, PasswordRef.current.value)
            history.push("/firebase-react-auth")
        }
        catch(e) {
            console.log(e)
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert> }
                </Card.Body>
                <Form onSubmit={handleSubmit} className="p-3">
                    <Form.Group id="email" className="px-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="Password" className="px-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={PasswordRef} required />
                    </Form.Group>

                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Log In
                    </Button>
                </Form>
            <div className="w-100 text-center mt-3 mb-3">
                <Link to="/firebase-react-auth/forgot-password">Forgot Password ?</Link>
            </div>

            </Card>
            <div className="w-100 text-center mt-2">
                Need an account ? <Link to="/firebase-react-auth/signup">Sign Up</Link>
            </div>
        </>
    )
}
