import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueContainer = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #c9c9c9;
`;
export const IssuePagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IssueFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

export const Button = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.disabled,
}))`
  border: 0;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #7159c1;
    color: #fff;
  }

  &:disabled {
    opacity: 0.3;
  }

  ${props =>
    props.k && props.k === props.filter
      ? css`
          background: #7159c1;
          color: #fff;
        `
      : ''}
`;

export const IssueList = styled.ul`
  list-style: none;
  padding-top: 20px;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px soldi #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #c9c9c9;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight:600
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
