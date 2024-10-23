import React from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { DiCodeigniter } from "react-icons/di";
import {
  BsCheckCircleFill,
  BsFillExclamationSquareFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import "./DashBoard.css";
import KanbanCard from "./KanbanCard";

const DashBoard = () => {
  const isStatusGroup = localStorage.getItem("group") === "status";
  const isPriorityGroup = localStorage.getItem("group") === "priority";
  const { selectedData, user } = useSelector((state) => state.SelectDataReducer);

  return (
    selectedData && (
      <div className="dashContainer" style={{ display: "flex", justifyContent: "space-around" }}>
        {selectedData.map((item, index) => {
          const cardWidth = 18.7; // Percentage width for each card
          return (
            <div key={index} className="dashCardContainer" style={{ width: `${cardWidth}%` }}>
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {user ? (
                    <div className="imageContainer" style={{ width: "10px", height: "15px", display: "inline-block" }} />
                  ) : isStatusGroup ? (
                    <div className="cardTitle" style={{ fontWeight: 200 }}>
                      {item.title === "Backlog" ? (
                        <BiLoader style={{ fontSize: "13px" }} />
                      ) : item.title === "Todo" ? (
                        <FaRegCircle style={{ fontSize: "13px", color: "#ddeded" }} />
                      ) : item.title === "In progress" ? (
                        <BiAdjust style={{ fontSize: "13px", color: "#f2d750" }} />
                      ) : item.title === "Done" ? (
                        <BsCheckCircleFill />
                      ) : (
                        <IoMdCloseCircleOutline />
                      )}
                    </div>
                  ) : isPriorityGroup ? (
                    <div className="tags color-grey" style={{ display: "inline-block" }}>
                      {["Low", "Medium", "High"].includes(item.title) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-signal" viewBox="0 0 16 16">
                          <rect x="1" y="10" width="3" height="2" />
                          <rect x="5" y="7" width="3" height="5" opacity={["Medium", "High"].includes(item.title) ? 1 : 0.25} />
                          <rect x="9" y="4" width="3" height="8" opacity={item.title === "High" ? 1 : 0.25} />
                        </svg>
                      ) : item.title === "Urgent" ? (
                        <BsFillExclamationSquareFill />
                      ) : (
                        <p></p>
                      )}
                    </div>
                  ) : (
                    <DiCodeigniter />
                  )}
                  <span>{item?.title} {item.value?.length}</span>
                </div>
                <div className="rightView">
                  <AiOutlinePlus />
                  <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {item.value?.map((cardData, cardIndex) => (
                  <KanbanCard
                    key={cardIndex}
                    id={cardData.id}
                    title={cardData.title}
                    tag={cardData.tag}
                    status={cardData.status}
                    priority={cardData.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {isStatusGroup && (
          <>
            <StatusSummary title="Done" count={0} icon={<BsFillCheckCircleFill style={{ color: "blue" }} />} />
            <StatusSummary title="Canceled" count={0} icon={<MdCancel style={{ color: "grey" }} />} />
          </>
        )}
      </div>
    )
  );
};

const StatusSummary = ({ title, count, icon }) => (
  <div className="dashCardHeading flex-sb">
    <div className="leftView" style={{ fontSize: "15px", marginRight: "60px", wordSpacing: "4px" }}>
      <div className="cardTitle" style={{ display: "inline-block", fontWeight: 200 }}>
        {icon}
      </div>
      <span style={{ fontSize: "13px", fontWeight: "lighter" }}>{title}</span>
      <span style={{ fontSize: "13px", color: "#8F9997" }}>{count}</span>
    </div>
    <div className="rightView">
      <AiOutlinePlus />
      <span style={{ letterSpacing: "2px" }}>...</span>
    </div>
  </div>
);

export default DashBoard;
