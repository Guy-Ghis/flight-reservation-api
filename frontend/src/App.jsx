import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    kickoff: '',
    date: ''
  })

  const API_BASE_URL = 'http://10.153.115.208:30080/api/tickets'

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch tickets')
      }
      const data = await response.json()
      setTickets(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createTicket = async (ticketData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      })
      if (!response.ok) {
        throw new Error('Failed to create ticket')
      }
      await fetchTickets()
      setShowCreateForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const searchTickets = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchFilters.destination) params.append('destination', searchFilters.destination)
      if (searchFilters.kickoff) params.append('kickoff', searchFilters.kickoff)
      if (searchFilters.date) params.append('date', searchFilters.date)

      const response = await fetch(`${API_BASE_URL}/search?${params}`)
      if (!response.ok) {
        throw new Error('Failed to search tickets')
      }
      const data = await response.json()
      setTickets(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchFilters({ destination: '', kickoff: '', date: '' })
    fetchTickets()
  }

  if (loading) {
    return <div className="loading">Loading tickets...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Flight Reservation System</h1>
      </header>

      <main className="main">
        <div className="controls">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Create New Ticket
          </button>
        </div>

        <div className="search-section">
          <h2>Search Tickets</h2>
          <div className="search-filters">
            <input
              type="text"
              placeholder="Destination"
              value={searchFilters.destination}
              onChange={(e) => setSearchFilters({...searchFilters, destination: e.target.value})}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Kickoff"
              value={searchFilters.kickoff}
              onChange={(e) => setSearchFilters({...searchFilters, kickoff: e.target.value})}
              className="search-input"
            />
            <input
              type="date"
              value={searchFilters.date}
              onChange={(e) => setSearchFilters({...searchFilters, date: e.target.value})}
              className="search-input"
            />
            <button onClick={searchTickets} className="btn btn-secondary">
              Search
            </button>
            <button onClick={clearSearch} className="btn btn-clear">
              Clear
            </button>
          </div>
        </div>

        <div className="tickets-section">
          <h2>Tickets ({tickets.length})</h2>
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <h3>{ticket.passengerName}</h3>
                <p><strong>From:</strong> {ticket.kickoff}</p>
                <p><strong>To:</strong> {ticket.destination}</p>
                <p><strong>Date:</strong> {ticket.bookingDate}</p>
              </div>
            ))}
          </div>
        </div>

        {showCreateForm && (
          <CreateTicketForm 
            onSubmit={createTicket}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </main>
    </div>
  )
}

function CreateTicketForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    passengerName: '',
    destination: '',
    kickoff: '',
    bookingDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label>Passenger Name:</label>
            <input
              type="text"
              value={formData.passengerName}
              onChange={(e) => setFormData({...formData, passengerName: e.target.value})}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Kickoff:</label>
            <input
              type="text"
              value={formData.kickoff}
              onChange={(e) => setFormData({...formData, kickoff: e.target.value})}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Booking Date:</label>
            <input
              type="date"
              value={formData.bookingDate}
              onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Create Ticket
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
