import styled from "styled-components"

export const FavoritesWrapper = styled.div`
  gap: 15px;
  display: flex;  
  margin-top: 15px;
  align-items: center;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TextWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }

  .main-title {
    font-size: 20px;
    font-weight: bold;
  }
`

export const ButtonWrapper = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
`