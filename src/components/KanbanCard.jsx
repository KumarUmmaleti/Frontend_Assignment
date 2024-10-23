import React from "react";
import "./KanbanCard.css"; // Ensure the CSS file name is updated too
import { FaRegCircle } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { BsCheckCircleFill, BsFillExclamationSquareFill } from "react-icons/bs";

const KanbanCard = ({ id, title, tag, status, priority }) => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];

  const getStatusIndex = (status) => {
    return statusOrder.indexOf(status);
  };

  return (
    <div className="kanbanCardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="kanbanCardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "30px", height: "30px" }}
        >
          <img
            style={{ width: "95%", height: "95%", borderRadius: "50%" }}
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
            alt="avatar"
          />
        </div>
      </div>
      <div className="kanbanCardContent">
        <h3>{title}</h3>
        <p>{tag}</p>
        <div className="kanbanCardStatusPriority">
          {isStatus && <p>Status: {status} ({getStatusIndex(status) + 1})</p>}
          {isPriority && <p>Priority: {priority}</p>}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
