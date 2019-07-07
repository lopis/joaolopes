import css from 'styled-components';

export default css.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media (max-width: 768px) {
        display: block;
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1440px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;