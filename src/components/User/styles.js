import styled from 'styled-components';

export const Container = styled.div`
  margin: 1px;
  padding: 2px;
`;

export const List = styled.div`
  list-style: none;
  margin: 5px;
`;

export const ListItem = styled.div`
  list-style: none;
  margin: 5px;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  img {
    border-radius: 50%;
    width: 64px;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;

  span {
    font-size: 12px;
    color: #6c757d;
    font-style: italic;
  }
`;

export const Action = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;

  i {
    color: #f55;
  }
`;
