import styled from 'styled-components';

// export const Container = styled.div`
//     height: 100vh;
//     padding: 25px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `

export const Container = styled.div`
  margin: 0;
`;

export const Text = styled.p`
  margin-top: 35px;
  font-size: 20px;
  font-weight: bold;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 245px auto 30%;
  min-height: 100vh;

  @media (max-width: 1200px) {
    grid-template-columns: 245px auto;
  }

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;

export const PreviousResContainer = styled.div`
  background-color: blue;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const ParseContainer = styled.div``;

export const PreviewContainer = styled.div`

  @media (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const NavBarButtons = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;
  margin-left: 45px;
  :focus {
    outline: none;
  }
`;

export const PreviewButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;

  :focus {
    outline: none;
  }

  @media (min-width: 800px) {
    display: none;
  }
`;

export const BigPreviewButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;

  :focus {
    outline: none;
  }

  @media (min-width: 1200px) {
    display: none;
  }
`;
