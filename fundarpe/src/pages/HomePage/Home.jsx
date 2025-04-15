import Header from "../../components/Header/Header"
import "../../App.css"
import MainContent from "../../components/MainContent/MainContent";

function Home() {
  return (
    <>
      <section className="menu_principal">
        <Header />
        <MainContent/>
      </section>
    </>
  );
}

export default Home;
