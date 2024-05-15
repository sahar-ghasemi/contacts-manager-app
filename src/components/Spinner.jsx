import SpinnerGif from "../assets/spinner.gif";
const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <img src={SpinnerGif} alt="" width="200" />
    </div>
  );
};
export default Spinner;
