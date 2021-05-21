import React, { useState, useEffect } from "react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import "../css/main.scss";
import firebase from "F:/code/droon/src/firebase";
import { music } from "../PadSoundTest";
import { useAuth } from 'F:/code/droon/src/contexts/AuthContext'

var titleVar = "";
var sendedVar;




const handleChange = (event) => {
  titleVar = event.target.value;
}

export default function ButtonPost (){
  const [name, setName] = useState([]);
  const { currentUser, logout } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("MyPosts").get();
      setName(data.docs.map(doc => (doc.data())));
    };
    fetchData();
  }, [])

  const handleSubmit = async (event) => {
  

    sendedVar = titleVar;
    event.preventDefault();
    const db = firebase.firestore();
    const ref = await db.collection("MyPosts");
    ref.add({
      string: sendedVar,
      song : music.toString(),
      uid : currentUser.uid,
      photoUrl : currentUser.photoURL
    });

};

  
      return (
        <div className=" buttonStyle">
          <form onSubmit={handleSubmit}>
            <input
              class="mt-4 mb-2 pl-2 pr-2 input-group"
              onChange={handleChange}
              type="text"
              placeholder="your title goes here"
            />

            <div>
              <textarea
                className="mt-4 mb-2 pl-2 pb-4 pr-2 input-group "
                
                placeholder="and the description goes here"
              />
            </div>
            <Container>
              <div className="text-center">
                <button className="btn btn-success" type="submit">
                  Post Your Song
                </button>
              </div>
            </Container>
          </form>
        
         
        </div>
      );
    
  
}
