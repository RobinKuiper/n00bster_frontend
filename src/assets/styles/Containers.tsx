import styled from "styled-components";

const FullCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 2.5fr repeat(2, 1fr);
    grid-template-rows: 1fr 1.5fr;
    grid-column-gap: 0;
    grid-row-gap: 0;
`
type Props = {
    area: string;
    padding?: string;
}
const GridCell = styled.div<Props>`
  grid-area: ${props => props.area};
  padding: ${props => props.padding ?? '10px'};
`

export { FullCentered, GridContainer, GridCell }
