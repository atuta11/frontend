import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import Header from "../components/Header";
import design1Image from '../assets/design1.jpeg';

function Home() {
    return(
        <>
        <Header/>
        <div className="mega">
        <div className="box1">
        <div className="combinedSection">
            <section className="heading">
                <h1>Help Needed ?</h1>
                <p>Please choose from an option below</p>
            </section>
            <Link to='/new-ticket' className="btn btn-reverse btn-block">
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to='/tickets' className="btn btn-block">
                <FaTicketAlt /> View My Tickets
            </Link>
        
        </div></div>
       <div className="box2">
        <div className="homeImage">
        <img src={design1Image} alt="HOME IMAGE" />
        </div></div>

        </div>
           
        </>
    )
}

export default Home;