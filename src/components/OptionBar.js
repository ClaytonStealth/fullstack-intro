import { useState, useEffect } from "react";

const OptionBar = (props) => {
  const { generateUrlParams } = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    generateUrlParams(limit, page, sortBy, order);
  }, [limit, page, sortBy, order]);

  return (
    <div className='option-bar'>
      <label>Limit</label>
      <input
        type='number'
        value={limit}
        onChange={(e) => {
          setLimit(e.target.value);
        }}
      ></input>
      <label>Number</label>
      <input
        type='number'
        value={page}
        onChange={(e) => {
          setPage(e.target.value);
        }}
      ></input>
      <label>Sort By</label>
      <select
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
      >
        <option value={""}></option>
        <option value='id'>id</option>
        <option value='title'>title</option>
        <option value='createdAt'>createdAt</option>
      </select>
      <label>Order</label>
      <select
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      >
        <option></option>
        <option value='asc'>asc</option>
        <option value='desc'>desc</option>
      </select>
    </div>
  );
};

export default OptionBar;
