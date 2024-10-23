import axios from "axios";

// Define action types as constants
const DATA_REQUEST = "DATA_REQUEST";
const DATA_SUCCESS = "DATA_SUCCESS";
const DATA_FAILURE = "DATA_FAILURE";
const SELECT_DATA_REQUEST = "SELECT_DATA_REQUEST";
const SELECT_DATA_SUCCESS = "SELECT_DATA_SUCCESS";
const SELECT_DATA_FAILURE = "SELECT_DATA_FAILURE";

// Fetch all data action creator
export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_REQUEST });
    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    dispatch({ type: DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DATA_FAILURE, payload: error.message }); // Include error message for better debugging
  }
};

// Select data action creator
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_DATA_REQUEST });
    let user = false;
    const selectedData = [];

    // Grouping logic based on the selected group
    if (group === "status") {
      const statusSet = new Set(allTickets.map(ticket => ticket.status));
      const statusArray = Array.from(statusSet);
      
      statusArray.forEach((status, index) => {
        const ticketsWithStatus = allTickets.filter(ticket => ticket.status === status);
        selectedData.push({ [index]: { title: status, value: ticketsWithStatus } });
      });
    } else if (group === "user") {
      user = true;
      allTickets.allUser.forEach((element, index) => {
        const ticketsForUser = allTickets.allTickets.filter(ticket => element.id === ticket.userId);
        selectedData.push({ [index]: { title: element.name, value: ticketsForUser } });
      });
    } else {
      const priorityList = ["No priority", "Urgent", "High", "Medium", "Low"];
      priorityList.forEach((priority, index) => {
        const ticketsWithPriority = allTickets.filter(ticket => index === ticket.priority);
        selectedData.push({ [index]: { title: priority, value: ticketsWithPriority } });
      });
    }

    // Sorting based on orderValue
    if (orderValue === "title") {
      selectedData.forEach(element => {
        element[Object.keys(element)[0]].value.sort((a, b) => a.title.localeCompare(b.title));
      });
    } else if (orderValue === "priority") {
      selectedData.forEach(element => {
        element[Object.keys(element)[0]].value.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch({ type: SELECT_DATA_SUCCESS, payload: { selectedData, user } });
  } catch (error) {
    dispatch({ type: SELECT_DATA_FAILURE, payload: error.message });
  }
};
