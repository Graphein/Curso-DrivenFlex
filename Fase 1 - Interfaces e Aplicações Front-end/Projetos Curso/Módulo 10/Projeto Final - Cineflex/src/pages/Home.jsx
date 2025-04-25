import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getMovies } from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((response) => setMovies(response.data))
      .catch((error) => alert("Erro ao carregar filmes."));
  }, []);

  return (
    <Container>
      <Title>Em Cartaz</Title>
      <MoviesGrid>
        {movies.map((movie) => (
          <StyledLink to={`/sessoes/${movie.id}`} key={movie.id}>
            <MovieCard>
              <img src={movie.posterURL} alt={movie.title} />
            </MovieCard>
          </StyledLink>
        ))}
      </MoviesGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2c2c;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MovieCard = styled.div`
  width: 100%;
  max-width: 150px;
  height: 220px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;
