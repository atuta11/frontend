import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket } from '../features/tickets/ticketSlice'
import { useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { getNotes } from '../features/notes/noteSlice'


function Ticket() {
  
  const { ticket } = useSelector((state) => state.tickets)
  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note);


  // NOTE: no need for two useParams
  // const params = useParams()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
  }, [ticketId, dispatch])

  useEffect(() => {
    dispatch(getNotes(ticketId));
  }, [dispatch, ticketId]);



  if (!ticket) {
    return <Spinner />
  }

  return (

    <div className='ticket-page'>

    <BackButton className="back-button" url='/tickets' id="baka" style={{color:"red"}} />
      <header className='ticket-header'>
        
        
        
        
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
        <h3 style={{ color: 'blue' }}>Description of Issue</h3>
          <p style={{ color: 'grey' }} >{ticket.description}</p>
        </div>
      </header>
      {/* Display Notes */}
      {notesIsLoading ? (
        <p>Loading notes...</p>
      ) : (
        <div className='notes-container'>
          <h3>Notes added by your Support Agent will be available here:</h3>
          {notes && Array.isArray(notes) ? (
            notes.map((note) => (
              note && note.text ? (
                <div key={note._id}>
                  <p>{note.text}</p>
                </div>
              ) : null
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Ticket