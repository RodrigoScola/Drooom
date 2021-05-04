import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {AuthWithGoogle} from './Signup'
import firebase from 'firebase';
import { auth } from "../firebase"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const provider = new firebase.auth.GoogleAuthProvider();

  const AuthWithGoogle = () => {
    try {
      setError('')
      setLoading(true);
      firebase.auth().signInWithPopup(provider)
      history.push('/')
    } catch {
      setError('could not complete google authentication')
    }
  }
  const [currentUser,setCurrentUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user)=> {
      setCurrentUser(user)
    })
  
  }, [])



  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
            <Button disabled={loading} onClick={AuthWithGoogle} className="btn btn-block btn-dark mt-1" type="sumbit">
              <i className="bi bi-google"></i>
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
