import { useState } from 'react'
import './App.css'
import { TicketControllerApi, Configuration } from './api';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const config = new Configuration({ basePath: 'http://10.153.115.208:30082' });
const api = new TicketControllerApi(config);
const queryClient = new QueryClient();

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    kickoff: '',
    date: ''
  });
  const queryClient = useQueryClient();

  // Fetch tickets (all or by search)
  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tickets', searchFilters],
    queryFn: async () => {
      if (searchFilters.destination) {
        return api.getByDestination({ destination: searchFilters.destination });
      } else if (searchFilters.kickoff) {
        return api.getByKickoff({ kickoff: searchFilters.kickoff });
      } else if (searchFilters.date) {
        return api.getByDate({ date: new Date(searchFilters.date) });
      } else {
        return api.getAllTickets();
      }
    },
  });

  // Create ticket mutation
  const createMutation = useMutation({
    mutationFn: (ticketData) => api.createTicket({ ticket: ticketData }),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
      setShowCreateForm(false);
    },
    onError: (err) => {
      alert('Error creating ticket: ' + err.message);
    },
  });

  // Delete ticket mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteTicket({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
    },
    onError: (err) => {
      alert('Error deleting ticket: ' + err.message);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const clearSearch = () => {
    setSearchFilters({ destination: '', kickoff: '', date: '' });
    refetch();
  };

  if (isLoading) {
    return <div className="loading">Loading tickets...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
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

        <div className="section">
          <h2>Search Tickets</h2>
          <form className="search-filters" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Destination"
              value={searchFilters.destination}
              onChange={(e) => setSearchFilters({ ...searchFilters, destination: e.target.value })}
              className="search-input"
              aria-label="Search by destination"
            />
            <input
              type="text"
              placeholder="Kickoff"
              value={searchFilters.kickoff}
              onChange={(e) => setSearchFilters({ ...searchFilters, kickoff: e.target.value })}
              className="search-input"
              aria-label="Search by kickoff"
            />
            <input
              type="date"
              value={searchFilters.date}
              onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
              className="search-input"
              aria-label="Search by date"
            />
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
            <button type="button" onClick={clearSearch} className="btn btn-clear">
              Clear
            </button>
          </form>
        </div>

        <div className="tickets-section">
          <h2>Tickets ({tickets.length})</h2>
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <h3>{ticket.passengerName}</h3>
                <p><strong>From:</strong> {ticket.kickoff}</p>
                <p><strong>To:</strong> {ticket.destination}</p>
                <p><strong>Date:</strong> {ticket.bookingDate instanceof Date
                  ? ticket.bookingDate.toLocaleDateString()
                  : (typeof ticket.bookingDate === 'string' && !isNaN(Date.parse(ticket.bookingDate))
                      ? new Date(ticket.bookingDate).toLocaleDateString()
                      : ticket.bookingDate)
                }</p>
                <button
                  className="btn btn-clear"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this ticket?')) {
                      deleteMutation.mutate(ticket.id);
                    }
                  }}
                  style={{ marginTop: '1rem' }}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showCreateForm && (
          <CreateTicketForm
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setShowCreateForm(false)}
            isLoading={createMutation.isLoading}
          />
        )}
      </main>
    </div>
  );
}

function CreateTicketForm({ onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    passengerName: '',
    destination: '',
    kickoff: '',
    bookingDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label htmlFor="passengerName">Passenger Name:</label>
            <input
              id="passengerName"
              type="text"
              value={formData.passengerName}
              onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              id="destination"
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="kickoff">Kickoff:</label>
            <input
              id="kickoff"
              type="text"
              value={formData.kickoff}
              onChange={(e) => setFormData({ ...formData, kickoff: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input
              id="bookingDate"
              type="date"
              value={formData.bookingDate}
              onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Ticket'}
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppWrapper;
