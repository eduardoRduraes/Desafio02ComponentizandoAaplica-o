
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { MoviesProvider } from './MovieContext';
import './styles/global.scss';



export function App() {     
  

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MoviesProvider>   
       <SideBar />
       <Content />
      </MoviesProvider>
        
    </div>
  )
}