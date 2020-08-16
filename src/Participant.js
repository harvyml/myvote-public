import React, {useEffect, useState, useReducer } from 'react';
import {Dropdown, Button} from 'react-materialize';
import LazyLoad from "react-lazyload"
import firebase from 'firebase';

const Loading = () => {
    return(
        <div className="participant loading">
            <h5>Loading contest...</h5>
        </div>
    )
}
function Participant(props) {
    const [contest, setContest] = useReducer(reducer, {})
    const [contestKeys, setContestKeys] = useReducer(reducer, 0)
    const [participantsKeys, setParticipants] = useReducer(reducer, 0)
    const [allGroups, setAllGroups] = useReducer(reducer, [])
    const [categories, setCategories] = useReducer(reducer, [""])

    function reducer(state, action){
        return action
    }

    function bringGroupInfo(contest){
        firebase.database().ref(`contest/${contest}/`).once("value").then(snap => {
            if(snap.val()){
                setContest(Object.assign(
                    contest,
                    snap.val().info
                ))
                setCategories(Object.assign(
                    categories,
                    snap.val().info.categories
                ))
                setContestKeys(Object.keys(snap.val()).length - 1)// Keys minus one because of the "info" node
                //===== Groups ======
                let keys = Object.keys(snap.val())
                for(let i = 0; i < keys.length; i++){
                    setAllGroups(Object.assign(allGroups, 
                        snap.val()
                    ))
                }
            }
        }).catch(err => console.log("ERROR: -----> "+ err.message))
    }

    function bringParticipants(contest){
        firebase.database().ref(`users/`).orderByChild("contest").equalTo(contest).once("value").then(snap => {
            if(snap.val()){
                setParticipants(Object.keys(snap.val()).length)
            }
        }).catch(err => console.log("ERROR: -----> "+ err.message))
    }


    useEffect(() => {
        reducer(bringGroupInfo(props.user.contest))
        reducer(bringParticipants(props.user.contest))
    }, [props.user])
 
    return (
        <div>
            <div className="main-row row">
                <UserInfo {...props.user}/>
                <div className="customed-container">
                    <div className="col s12 m6 l6">
                        <div className="mini mini-m">
                            <div className="contest-info">
                                <h5>{contest.name}</h5>
                                <p>{contest.description}</p>
                            </div>
                            <ul>
                                <li>Number of Groups: {contestKeys}</li>
                                <li>Number of participants: {participantsKeys - contestKeys}</li>
                            </ul>
                        </div>
                    </div>

                    <LazyLoad key={props.user.contest} placeholder={<Loading/>}>
                        <InfoPerCategory contestName={contest.name} contestCode={props.user.contest} allGroups={allGroups} categories={categories}/>
                    </LazyLoad>
                </div>
            </div>
            
        </div>
    )
}

function UserInfo(props){
    return(
        <div className="customed-container">
            <div className="col s12 m6 l6">
                <div className="mini mini-m">
                    <h5>{props.name}</h5>
                    <ul>
                        <li>{defineRol(props.rol)}</li>
                        <li>Phone: {props.phone}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function defineRol(rol){
    if(rol == 1){
        return "Manager"
    }else if(rol == 2){
        return "Judge"
    }else if(rol == 3){ 
        return "Participant"
    }else if(rol == 4){
        return "Group"
    }else{
        return "Not Defined Rol"
    }
}

function InfoPerCategory(props){
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useReducer(reducer, 0)
    const [allGroupsM, setAllGroupsM] = useReducer(reducer, {})//The "M" stands for modified
    const [ready, setReady] = useReducer(reducer, false)
    const [scores, setScores] = useReducer(reducer, {})
    function reducer(state, action){
        return action
    }

    function modifyAllGroups(category){
        var keys;
        if(ready){
            firebase.database().ref(`contest/${props.contestCode}/`).orderByChild("category").equalTo(category).once("value").then(snap => {
                keys = snap.val() ? Object.keys(snap.val()) : ""
                if(snap.val()){
                    if(snap.val()[keys]){
                        setAllGroupsM(snap.val())
                        setReady(false)
                    }else{
                        setAllGroupsM({})
                        setAllGroupsM(snap.val())
                    }
                }
            }).catch(err => {
                console.log(err.message)
                setAllGroupsM(["No Groups In This Category"])
            })
        }else{
            setAllGroupsM({})
        }  
    }
    useEffect(() => {
        setCategories(props.categories)
    }, [props.contest], [categories])
    useEffect(() => {
        console.log(category, allGroupsM, scores)
    }, [category])
    useEffect(() => {
        if(ready){
            modifyAllGroups(1000000)
            modifyAllGroups(category)
        }else{
            modifyAllGroups(category)
        }
    }, [category], [ready])


    return (
        <div className="col s12 m12 l12">
            <div className="mini mini-m">
                <div className="contest-info flex">
                    <h4>{props.contestName}</h4>{/*Props Passed From ./Body.js*/}
                    <Dropdown
                        options={{
                            alignment: 'left',
                            autoTrigger: true,
                            closeOnClick: true,
                            constrainWidth: true,
                            container: null,
                            coverTrigger: true,
                            hover: false,
                            inDuration: 150,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            outDuration: 250
                        }}
                        trigger={<Button node="button" className="categories-dropdown">Category</Button>}
                    >
                        {
                            categories.map((t, i) => {
                                let k = i+1 //i+1 because the first element in dropdown is an empty category
                                return (
                                    <a key={k} onClick={() => {
                                        setReady(true)
                                        setCategory(k)
                                    }
                                    }>{t}</a>
                                )
                            })
                        }
                    </Dropdown>
                </div>
                <table className="highlight table participants-judges-table participants">
                    <thead>
                        <td>Group</td>
                        <td>Code</td>
                        <td>Current Score</td>
                    </thead>
                    <tbody>
                        {
                            Object.keys(allGroupsM).map((key) => {
                                var t = allGroupsM[key]
                                var j = 0
                                var scoreKeys = Object.keys(t.scores)
                                scoreKeys.forEach(scg => {
                                    let sc = t.scores[scg]
                                    j += sc
                                })
                                let average = (j/scoreKeys.length).toFixed(2)
                                return (
                                    <tr key={t.code}>
                                        <td>{t.name}</td>
                                        <td>{t.code}</td>
                                        <td>{average}</td>
                                    </tr>
                                )
                            })                                        
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Participant