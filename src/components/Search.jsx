import styled from "styled-components";
import { useState } from "react";
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const Search = () => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();


    const submitHandeler = (e) => {
        e.preventDefault();
        navigate(`/searched/${input}`);
    };



  return (
    <FormStyle onSubmit={submitHandeler}> 
        <div>
            <FaSearch />
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input} />
        </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0rem 20rem;
    div{
        position: relative;
        width: 100%;
    }
    input{
        border: navajowhite;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border-radius: 0.8rem;
        outline: none;
        width: 100%;
        height: 40px;
        font-size: 1rem;
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: #fff;
    }

`;
export default Search