import { React } from "react";

import "./badge.css";

export default function Badge({ bold, color, type, children, ...rest }) {
  return (
    <div className="badge-wrapper">
      <span
        style={{ backgroundColor: color, fontWeight: bold ? "bold" : "" }}
        className={"badge " + (type ? type : "primary")}
      >
        {children}
      </span>
    </div>
  );
}
