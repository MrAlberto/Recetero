import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


function Recipe() {

    const [recipeDetail, setRecipeDetail] = useState({})

    const [activeTab, setActiveTab] = useState('instructions')

    let params = useParams()

    const getRecipeDetail = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const recipes = await data.json();
        setRecipeDetail(recipes);
        console.log(recipes);
    };
 
    useEffect(() => {
        getRecipeDetail()
    },[params.name])

  return (
    <DetailWrapper>
        <div>
            <h2>{recipeDetail.title}</h2>
            <img src={recipeDetail.image} alt={recipeDetail.title} />
        </div>
        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : '' } onClick={() => setActiveTab('instructions')}>Instructions</Button>
            <Button className={activeTab === 'ingredients' ? 'active' : '' } onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
            {activeTab === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: recipeDetail.summary}}></h3>
                    <h3 dangerouslySetInnerHTML={{__html: recipeDetail.instructions}}></h3>
                </div>
            )}
            {activeTab === 'ingredients' && (
                <ul>
                    {recipeDetail.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            )}
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background-color: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    &:hover{
        cursor: pointer;
    }
`

const Info = styled.div`
    margin-left: 10rem;
`

export default Recipe