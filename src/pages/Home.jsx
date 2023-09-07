import Login from "../components/Login"
import { Button } from "@nextui-org/react"

export default function Home() {
  return (
    <div className="main-container back-home">
        <h1 className="main-title">Bienvenido a Nuestra Página</h1>
        <h2 className="sub-title">Estamos encantados de tenerte aquí</h2>
        <a href="/signup" className="main-btn" role="button" aria-label="Descubre más sobre nosotros.">Descubre Más</a>
        <Login/>
        <footer>
            <p className="footer-text">Derechos de autor &copy; 2023 Tu Compañía</p>
        </footer>
    </div>
  )
}
