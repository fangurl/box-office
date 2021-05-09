import styled from 'styled-components'

export const TitleWrapper = styled.div`
  text-align: center;
  margin: 0 0 40px;

  h1 {
    color: ${({ theme }) => theme.mainColors.blue};
    letter-spacing: 8px;
    text-transform: uppercase;
    margin: 0 0 10px;
    font-family: cursive ;
  }

  p {
    color: ${({ theme }) => theme.mainColors.dark};
    margin: 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }
`;