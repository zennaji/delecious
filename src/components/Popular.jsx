import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';


const Popular = () => {
    
    const [popular, setPopular] = useState([]);

    // running the useEffect hook to execute the function on the component mount
    useEffect(() => {
        getPopular();
    }, []);

    // calling the api
    const getPopular = async () => {

        // local storage to store the data if there is something, if not, it will fetch the data from the api
        const check = localStorage.getItem("popular");
        if (check) {
            setPopular(JSON.parse(check));
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();

            // storing the data in the local storage
            localStorage.setItem("popular", JSON.stringify(data.recipes));

            console.log(data.recipes);
            setPopular(data.recipes);

        }
      
     }

  return (
    <div>
        <Wrapper >
            <h3>Trending</h3>
            <Splide options={{
                perPage: 4,
                gap: '3rem',
                arrows: false,
                pagination: false,
                drag: 'free',
            }}>
                {popular.map((recipe) =>{
                    return( 
                        <SplideSlide key={recipe.id}>
                            <Card  >
                                <Link to={`/recipe/${recipe.id}`}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    </div>
  )
}
// styled components for the component 
const Wrapper = styled.div`
    margin: 4rem;
`;
const Card = styled.div`
min-height: 17rem;
width: 15rem;
border-radius:2rem;
overflow: hidden;
position: relative;
cursor: grab;
 


img{
    border-radius: 1rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
}
p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;	
background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%);
`;
export default Popular