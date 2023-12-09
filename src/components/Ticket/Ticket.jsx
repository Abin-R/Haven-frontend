function Ticket() {
  return (
    <div>
      <main className="flex flex-col">
        <section className="w-full  flex-grow  flex items-center justify-center p-6 ">
          <div className="flex w-full max-w-3xl text-zinc-50 h-64 ">
            <div className="h-full bg-zinc-900 flex items-center  justify-center px-8 rounded-l-3xl">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="140px"
                height="140px"
                viewBox="0 0 232 232"
                enableBackground="new 0 0 232 232"
                xmlSpace="preserve"
              >
                <rect x="0" y="0" width="232" height="232" fill="#18181b" />
              </svg>
            </div>
            <div className="relative h-full flex flex-col items-center border-dashed justify-between border-2 bg-zinc-900 border-zinc-50">
            
              <div className="absolute h-4 w-8 bg-white rounded-tl-full rounded-tr-full -bottom-1"></div>
              <div className="absolute h-4 w-8 bg-white rounded-bl-full rounded-br-full -top-1"></div>
            </div>
            <div className="h-full py-8 px-10 bg-zinc-900 flex-grow rounded-r-3xl flex flex-col ">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col items-center">
                  <img
                    className="w-40"
                    src="data:image/jpeg;base64,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"
                  ></img>
                  <span className="font-bold text-xs">54879dhtyuty</span>
                </div>
                <div className="flex flex-col flex-grow items-center px-10">
                  {/* <span className="text-xs text-zinc-400 mt-3 mb-2">Booking ID</span> */}
                  <div className="w-full flex items-center mt-2">
                    <div className="w-3 h-3 rounded-full border-2 border-zinc-900"></div>
                    <div className="flex-grow border-t-2 border-zinc-400 border-dotted h-px"></div>

                    <div className="flex-grow border-t-2 border-zinc-400 border-dotted h-px"></div>
                    <span className="font-bold text-xs"></span>
                    <div className="w-3 h-3 rounded-full border-2 border-zinc-900"></div>
                  </div>
                  {/* <div className="flex items-center px-4 whitespace-nowrap rounded-full bg-lime-400 h-8 mt-2">
                    <span className="text-sm text-zinc-900">9 Ticket(s)</span>
                  </div> */}
                </div>
                <div className="flex flex-col items-center my-4">
                  <span className=" ml-5 text-2xl font-bold mb-3">54879dhtyuty</span>
                  <button className="flex items-center justify-center text-center px-4 whitespace-nowrap rounded-full bg-lime-400 h-6 my-2">
  <span className="text-xs text-center flex items-center justify-center text-zinc-900">9 Ticket(s)</span>
</button>

                </div>
              </div>
              <div className="flex w-full mt-auto justify-between ">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Date</span>
                  <span className="font-mono">SDGHRFH</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Departure</span>
                  <span className="font-mono">FGHFDJHF</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Passenger</span>
                  <span className="font-mono">FGJHJF</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Gate/Seat</span>
                  <span className="font-mono">FDJTGJK</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Ticket;
