import styled from 'styled-components';

const StyledOrder = styled.div`
width: 80%;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
padding: 10px;
margin: 1% auto;
box-sizing: border-box;
`

const IngredientSpan = styled.span`
text-transform: capitalize;
display: inline-block;
margin: 0 8px;
border: 1px solid #ccc;
padding: 5px;
`

export{ StyledOrder, IngredientSpan};