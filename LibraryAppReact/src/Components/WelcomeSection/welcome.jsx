import "./welcome.css"

function Welcome() {
  return (
    <>
      <section className="welcome bg-gray-300 h-[calc(100vh-100px)] flex justify-center ">
        <div className="container w-full flex justify-center items-center text-center p-20">
            <p className="uppercase w-120 text-4xl">
              Welcome to the library management system
            </p>
            <p className="w-88">
              You can use publisher, author, book, category, buying books features in the library management system.
            </p>
        </div>
      </section>
    </>
  )
}

export default Welcome