import styled from 'styled-components';

      export const Burger = styled.div`
        /* Styles for mobile devices */
        width: 100%;
        margin: auto;
        height: 300px;
        overflow: auto;   /* if the Burger is bigger than 300px it is scrollable and not cutt off*/
        text-align: center;
        font-weight: bold;
        font-size: 1.2 rem;
    
        @media (min-width: 1000px) and (min-height: 700px) {
            width: 700px;
            height: 600px;
        }
    
        @media (min-width: 500px) and (min-height: 401px) {
            width: 450px;
            height: 400px;
        }
    
    //Portrait Mode
        @media (min-width: 500px) and (max-height: 400px) {
            width: 350px;
            height: 300px;
        }
        `
        export default Burger
