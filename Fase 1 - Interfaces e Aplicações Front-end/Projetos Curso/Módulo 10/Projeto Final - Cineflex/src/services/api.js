import axios from "axios";

const API_BASE_URL = "https://mock-api.driven.com.br/api/v8/cineflex";

export function getMovies() {
  return axios.get(`${API_BASE_URL}/movies`);
}

export function getShowtimes(movieId) {
  return axios.get(`${API_BASE_URL}/movies/${movieId}/showtimes`);
}

export function getSeats(sessionId) {
  return axios.get(`${API_BASE_URL}/showtimes/${sessionId}/seats`);
}

export function bookSeats(data) {
  return axios.post(`${API_BASE_URL}/seats/book-many`, data);
}
