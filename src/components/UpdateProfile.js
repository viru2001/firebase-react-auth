import React, { useRef,useState } from 'react'
import { Card, Form, Button , Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const PasswordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser , updatePassword , updateEmail } = useAuth();
    // const currentUser = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        // { currentUser && currentUser.email}
        if (PasswordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if(PasswordRef.current.value){
            promises.push(updatePassword(PasswordRef.current.value))
        }

        Promise.all(promises).then( ()=>{
            history.push("/")
        }).catch(() =>{
            setError("Failed to update profile")
        }).finally( ()=>{
            setLoading(false)
        })
        
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert> }
                </Card.Body>
                <Form onSubmit={handleSubmit} className="p-3">
                    <Form.Group id="email" className="px-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                    </Form.Group>

                    <Form.Group id="Password" className="px-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={PasswordRef} placeholder="leave blank to keep same" />
                    </Form.Group>

                    <Form.Group id="password-confirm" className="px-3">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="leave blank to keep same" />
                    </Form.Group>

                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Update
                    </Button>
                </Form>
            </Card>
            <div className="w-100 text-center mt-2">
               <Link to="/">Cancel</Link>
            </div>
        </>
    )
}
