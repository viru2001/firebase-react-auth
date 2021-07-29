import React, { useRef,useState } from 'react'
import { Card, Form, Button , Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function ForgotPassword() {
    const emailRef = useRef();
    const {resetPassword } = useAuth();
    // const currentUser = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        // { currentUser && currentUser.email}
       
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('check your inbox for further instructions')
        
        }
        catch(e) {
            console.log(e)
            setError("Failed to reset Password")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert> }
                    {message && <Alert variant="success">{message}</Alert> }
                </Card.Body>
                <Form onSubmit={handleSubmit} className="p-3">
                    <Form.Group id="email" className="px-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Reset Password
                    </Button>
                </Form>
            <div className="w-100 text-center mt-3 mb-3">
                <Link to="/firebase-react-auth/login">Log In</Link>
            </div>

            </Card>
            <div className="w-100 text-center mt-2">
                Need an account ? <Link to="/firebase-react-auth/signup">Sign Up</Link>
            </div>
        </>
    )
}
