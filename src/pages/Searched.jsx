import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import styled from 'styled-components'



const Searched = () => {

    const [srearchedRecipes , setSearchedRecipes] = useState([]);
    let params = useParams();

    const geSearched= async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };

    useEffect(() =>{
        geSearched(params.search);
       
    },[params.search]);

  return (
    <Grid>
        {srearchedRecipes.map((item) =>{
            return(
                <Card key={item.id}> 
                    <Link to={`/recipe/${item.id}`}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            );
        })}
    </Grid>
  )
}


const Grid = styled.div`
    display: Grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
    border-radius: 2rem; 
    
    width: 100%;
     }
    a{
        text-decoration: none;
    }
    h4{
        color: #1b1b1b;
        text-align: center;
        padding: 1rem;
    }

`;

export default Searched