import styled from "styled-components";

const FullCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

type GridContainerProps = {
    columns?: string;
    rows?: string;
    templateAreas?: string;
    rowGap?: string;
    columnGap?: string;
    autoFlow?: string;
}
const GridContainer = styled.div<GridContainerProps>`
    display: grid;
    grid-template-columns: ${props => props.columns ?? 'repeat(3, 1fr)'};
    grid-template-rows: ${props => props.rows ?? 'repeat(3, 1fr)'};
    grid-template-areas: ${props => props.templateAreas ?? 'none'};
    grid-column-gap: ${props => props.columnGap ?? 0};
    grid-row-gap: ${props => props.rowGap ?? 0};
    grid-auto-flow: ${props => props.autoFlow ?? 'dense'}
    grid-gap: 0;
`
type GridCellProps = {
    area?: string;
    smallArea?: string;
    padding?: string;
    border?: string;
}
const GridCell = styled.div<GridCellProps>`
  grid-area: ${props => props.area};
  padding: ${props => props.padding ?? '10px'};
  border: ${props => props.border ?? 'none' };
  min-height: 0;

  @media (max-width: 1300px) {
    grid-area: ${props => props.smallArea ?? props.area};
  }
`

export { FullCentered, GridContainer, GridCell }
