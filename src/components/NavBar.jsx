import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../Actions/DataAction";

const initializeLocalStorage = () => {
  localStorage.setItem("group", "status");
  localStorage.setItem("order", "priority");
};

const retrieveOrder = () => localStorage.getItem("order") || "priority";
const retrieveGroup = () => localStorage.getItem("group") || "status";

const NavBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUsers } = useSelector((state) => state.DataReducer);
  const [currentGroup, setCurrentGroup] = useState(retrieveGroup());
  const [currentOrder, setCurrentOrder] = useState(retrieveOrder());

  const handleSelectionChange = (event, isGroup) => {
    const value = event.target.value;
    if (isGroup) {
      setCurrentGroup(value);
      localStorage.setItem("group", value);
    } else {
      setCurrentOrder(value);
      localStorage.setItem("order", value);
    }
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const payload = currentGroup === "user"
      ? { group: currentGroup, data: { allTickets, allUsers }, order: currentOrder }
      : { group: currentGroup, data: allTickets, order: currentOrder };

    dispatch(selectData(payload.group, payload.data, payload.order));
  }, [allTickets, dispatch, currentGroup, allUsers, currentOrder]);

  return (
    <div className="top-header" style={{ paddingLeft: "13px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <TiThList /> Display
        </button>
        {isDropdownVisible && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Grouping</span>
              <select
                value={currentGroup}
                onChange={(e) => handleSelectionChange(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Ordering</span>
              <select
                value={currentOrder}
                onChange={(e) => handleSelectionChange(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

initializeLocalStorage(); // Set initial values in local storage

export default NavBar;
