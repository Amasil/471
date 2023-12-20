const RecipientAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [recipientId, setRecipientId] = useState(""); 
  
    useEffect(() => {
      fetchRecipientAppointments();
    }, []);
  
    const fetchRecipientAppointments = async () => {
      try {
        //get appointments for the recipient
        const response = await fetch(
          `http://localhost:3000/get-recipient-appointments/${recipientId}`
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching recipient's appointments:", error);
      }
    };
  
    return (
      <div className="recipient-appointments-container">
        <header>
          <h1>Your Transfusion Appointments</h1>
        </header>
        <div className="appointments-container">
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Volume</th>
                <th>Blood Type</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.Appointment_ID}>
                  <td>{appointment.Appointment_ID}</td>
                  <td>{appointment.Appointment_Date.split("T")[0]}</td>
                  <td>{appointment.Appointment_Time}</td>
                  <td>{appointment.Volume}</td>
                  <td>{appointment.Blood_Type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default RecipientAppointments;
  