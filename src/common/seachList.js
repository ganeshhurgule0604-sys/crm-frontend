function SearchList({ placeHolder, type, onChange }) {
  return (
    <>
      <input
        type={type}
        name="name"
        placeholder={placeHolder}
        onChange={onChange}
      />
    </>
  );
}

export default SearchList;