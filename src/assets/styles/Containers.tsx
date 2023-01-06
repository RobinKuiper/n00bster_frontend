import styled from "styled-components";

const FullCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

type GridContainerProps = {
    columns?: string;
    rows?: string;
    rowGap?: string;
    columnGap?: string;
}
const GridContainer = styled.div<GridContainerProps>`
    display: grid;
    grid-template-columns: ${props => props.columns ?? 'repeat(3, 1fr)'};
    grid-template-rows: ${props => props.rows ?? 'repeat(3, 1fr)'};
    grid-column-gap: ${props => props.columnGap ?? 0};
    grid-row-gap: ${props => props.rowGap ?? 0};
    grid-gap: 0;
`
type GridCellProps = {
    area: string;
    padding?: string;
}
const GridCell = styled.div<GridCellProps>`
  grid-area: ${props => props.area};
  padding: ${props => props.padding ?? '10px'};
`

export { FullCentered, GridContainer, GridCell }
