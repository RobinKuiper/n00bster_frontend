import styled from "styled-components";

type FlexProps = {
    direction?:     string;
    justifyContent?:string;
    wrap?:          string;
    alignContent?:  string;
    alignItems?:    string;
    border?:        string;
}
export const Flex = styled.div<FlexProps>`
  display:          flex;
  flex-direction:   ${props => props.direction ?? 'column'};
  flex-wrap:        ${props => props.wrap ?? 'nowrap'};
  align-content:    ${props => props.alignContent ?? 'flex-start'};
  align-items:      ${props => props.alignItems ?? 'flex-start'};
  justify-content:  ${props => props.justifyContent ?? 'flex-start'};
  border:           ${props => props.border ?? 'none'};
`

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  padding: 8px 10px;

  &:last-child {
    border-bottom: none;
  }
`;


export const Panel = styled(Flex)`
  background: white;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cfd8e2;

  h4 {
    font-size: 1.2rem;
    color: #6b646b;
  }

  > * {
    width: 100%;
  }

  > * + * {
    margin-top: 20px;
  }
`

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
