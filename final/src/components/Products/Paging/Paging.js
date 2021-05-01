import React, { useState } from "react";

const Paging = (props) => {

  const [pagedata, setpagedata] = useState(props.data);

  const [numbers, setnumbers] = useState(
    [...Array(Math.ceil(pagedata.total / pagedata.pageSize))].map(
      (i, index) => index + 1
    )
  );

  const handleCLick = (item) => {
    let newstate = { ...pagedata, page: item };
    setpagedata(newstate);
    props.HandleCLick(item);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {numbers.map((item) => {
          return (
            <li
              key={item}
              onClick={() => handleCLick(item)}
              className={[
                "page-item",
                pagedata.page === item ? "active" : null,
              ].join(" ")}
            >
              <a className="page-link">{item}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paging;
