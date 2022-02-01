import React, { useState } from 'react'

const Test = (props) => {
    const [name, setName] = useState('');

    const submit = () => {
        if(name.length < 5){
            alert("name too short")
        }
        else {
            props.history.push("/")
        }
    }

    return (
        <div>
        <h1>Please enter name</h1>
            <input type="text" onChange={e => setName(e.target.value)}></input>
            <input type="file" name="myImage" accept="image/*" />
            <button onClick={submit}>submit</button>
        </div>
    )
}

export default Test
