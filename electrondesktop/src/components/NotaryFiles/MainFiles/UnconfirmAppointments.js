import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardUNC from "../HelperFiles/CardU";
import "./mainFiles.css"; // Import CSS file
import { useEffect, useState } from "react";
import axios from "axios";

const UnconfirmedAppointments = () => {
  const [userPaymentInformation, setUserPaymentInformation] = useState([]);
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/notaryUnconfirmedAppointment",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Unpaid appointments:", response.data);
        const userPaymentInformationResposne = await response.data.map(
          (appointment, index) => {
            return {
              id: appointment.AppointmentIds,
              userName: appointment.userObj.userName,
              date: appointment.AppointmentData.date,
              time: appointment.AppointmentData.timeSlot,
              image: appointment.userObj.image,
              paidReceipt: `http://localhost:8080/${appointment.AppointmentData.paidReceipt.replaceAll(
                "\\",
                "/"
              )}`,
            };
          }
        );
        console.log(
          "Notary Payment Information:",
          userPaymentInformationResposne
        );
        // Update the state with the fetched data
        setUserPaymentInformation(userPaymentInformationResposne);
      } catch (error) {
        console.error("Error fetching unpaid appointments:", error);
      }
    };

    getAppointments();
  }, []);
  return (
    <Box>
      <Box className="headerSection">
        <Typography variant="h5" className="upcomingAppointmentTitle">
          Unconfirmed Appointments
        </Typography>
      </Box>

      <Box className="upcomingAppointmentsContainer">
        <CardUNC userPaymentInformation={userPaymentInformation} />
      </Box>
    </Box>
  );
};

export default UnconfirmedAppointments;
