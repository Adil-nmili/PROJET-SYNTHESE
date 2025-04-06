
const Hearder = ({title}) => {
    const letterSpacing = {
        letterSpacing: '10px'
    }
  return (
    <div>
      <h1
        style={letterSpacing}
      className="uppercase py-10 text-center font-bold text-xl underline">
        {title}
      </h1>
    </div>
  )
}

export default Hearder
