import {Children, createContext, ReactNode, useEffect, useState} from 'react'
import { api } from './services/api';

interface Genrer {
      id: number;
      name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
      title: string;  
} 

interface Movie{
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextData{
    movies: Movie[];
    selectedGenre: Genrer; 
    genres: Genrer[];
    selectedGenreId:number;
    handleClickButton: (id:number) => void;
}


interface MovieProviderProps{
    children: ReactNode;
}



export const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData );

export const MoviesProvider = ({children}: MovieProviderProps) =>{

  const [movies, setMovies] = useState<Movie[]>([]);   
  const [selectedGenre, setSelectedGenre] = useState<Genrer>({} as Genrer);   
  const [genres, setGenres] = useState<Genrer[]>([]); 
  const [selectedGenreId, setSelectedGenreId] = useState(1);   


  useEffect(() => {
    api.get<Genrer[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genrer>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  
  function handleClickButton(id: number) {
   setSelectedGenreId(id);
  }

  return (
      <MoviesContext.Provider value={{movies,genres,handleClickButton,selectedGenre,selectedGenreId}}>
          {children}
      </MoviesContext.Provider>
  )
}