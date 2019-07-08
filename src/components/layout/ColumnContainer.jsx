import css from 'styled-components';

export default css.div`
    display: grid;
    @media (min-width: 769px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1440px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1800px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;