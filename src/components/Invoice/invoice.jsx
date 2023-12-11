import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Invoice() {
  const { eventId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // Fetch payment data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/admins/invoice/${eventId}`
        );

        console.log(response.data);
        setPaymentData(response.data.booking);
        setTransaction(response.data.transaction);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadAsPDF = async () => {
    const pdf = new jsPDF();

    // Ensure that the content is fully rendered
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const invoiceContent = document.getElementById("invoice-content");

    // Use html2canvas to capture the content as an image
    const canvas = await html2canvas(invoiceContent);
    const imageData = canvas.toDataURL("image/png");

    // Add the image data to the PDF
    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height
    );

    // Download the PDF
    pdf.save("invoice.pdf");
  };

  return (
    <>
      {paymentData ? (
        <div>
          <body className="bg-transparent ">
            <div className="mt-6 flex justify-end gap-x-3  mx-48">
              <button
                onClick={downloadAsPDF}
                className="py-2  px-3  inline-flex justify-center items-center gap-2 rounded-lg border font-medium   shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-offset-2  transition-all text-sm bg-slate-700 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white "
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Invoice PDF
              </button>
              {/* <button onClick={downloadAsPDF}>Download as PDF</button>         */}
              
            </div>
            <div
              id="invoice-content"
              className="max-w-[100rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-3"
            >
              <div className="sm:w-11/12 lg:w-3/4 mx-auto">
                <div className="flex flex-col p-4 sm:p-10 bg-stone-100 shadow-md rounded-xl ">
                  <div className="flex justify-between">
                    <Link to="/">
                      <img
                        className="h-8 w-auto mx-8 my-10"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Haven_Holiday_Wordmark.svg/1280px-Haven_Holiday_Wordmark.svg.png"
                        alt="Your Company"
                      />
                    </Link>

                    <div className="text-end">
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 ">
                        Invoice #
                      </h2>
                      <span className="mt-1 block text-gray-500">3682303</span>

                      <address className="mt-4 not-italic text-gray-800 ">
                        45 Roker Terrace
                        <br />
                        Latheronwheel
                        <br />
                        KW5 8NW, London
                        <br />
                        United Kingdom
                        <br />
                      </address>
                    </div>
                  </div>

                  <div className="mt-8 grid sm:grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 ">
                        Bill to:
                      </h3>
                      <h3 className="text-lg font-semibold text-gray-800 ">
                        {paymentData.user.username}
                      </h3>
                      <address className="mt-4 not-italic text-gray-800 ">
                        {/* 45 Roker Terrace */}
                        {paymentData.user.address}
                        <br />
                        {/* Latheronwheel */}
                        {paymentData.user.country}
                        <br />

                        {paymentData.user.zipcode}
                        <br />
                      </address>
                    </div>

                    <div className="sm:text-end space-y-2">
                      <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                          <dt className="col-span-3 font-semibold text-gray-800 ">
                            Invoice date:
                          </dt>
                          <dd className="col-span-2 text-gray-500">
                            {new Date(
                              transaction.transaction_date
                            ).toLocaleDateString()}
                          </dd>
                        </dl>
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                          <dt className="col-span-3 font-semibold text-gray-800 ">
                            Due date:
                          </dt>
                          <dd className="col-span-2 text-gray-500">
                            {new Date(
                              transaction.transaction_date
                            ).toLocaleDateString()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                      <div className="hidden sm:grid sm:grid-cols-5">
                        <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                          Item
                        </div>
                        <div className="text-start text-xs font-medium text-gray-500 uppercase">
                          Qty
                        </div>
                        <div className="text-start text-xs font-medium text-gray-500 uppercase">
                          Rate
                        </div>
                        <div className="text-end text-xs font-medium text-gray-500 uppercase">
                          Amount
                        </div>
                      </div>

                      <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div className="col-span-full sm:col-span-2">
                          <p className="font-medium text-gray-800">
                            {transaction.event.title}
                          </p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Qty
                          </h5>
                          <p className="text-gray-800 ">
                            {paymentData.ticket_count}
                          </p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Rate
                          </h5>
                          <p className="text-gray-800 ">{transaction.event.cost}</p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </h5>
                          <p className="sm:text-end text-gray-800 ">
                            ${transaction.amount}
                          </p>
                        </div>
                      </div>

                      <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                    </div>
                  </div>

                  <div className="mt-8 flex sm:justify-end">
                    <div className="w-full max-w-2xl sm:text-end space-y-2">
                      <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                          <dt className="col-span-3 font-semibold text-gray-800 ">
                            Total:
                          </dt>
                          <dd className="col-span-2 text-gray-500 mr-6">
                            {" "}
                            ${transaction.amount}
                          </dd>
                        </dl>

                        {/* <dl class="grid sm:grid-cols-5 gap-x-3">
                           <dt class="col-span-3 font-semibold text-gray-800 ">
                             Tax:
                           </dt>
                           <dd class="col-span-2 text-gray-500">$39.00</dd>
                         </dl>
     
                         <dl class="grid sm:grid-cols-5 gap-x-3">
                           <dt class="col-span-3 font-semibold text-gray-800">
                             Amount paid:
                           </dt>
                           <dd class="col-span-2 text-gray-500">$2789.00</dd>
                         </dl>
     
                         <dl class="grid sm:grid-cols-5 gap-x-3">
                           <dt class="col-span-3 font-semibold text-gray-800 ">
                             Due balance:
                           </dt>
                           <dd class="col-span-2 text-gray-500">$0.00</dd>
                         </dl> */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Thank you!
                    </h4>
                    <p className="text-gray-500">
                      If you have any questions concerning this invoice, use the
                      following contact information:
                    </p>
                    <div className="mt-2">
                      <p className="block text-sm font-medium text-gray-800 ">
                        example@site.com
                      </p>
                      <p className="block text-sm font-medium text-gray-800">
                        +1 (062) 109-9222
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
                </div>
              </div>
            </div>
          </body>
        </div>
      ) : (
        "hii"
      )}
    </>
  );
}

export default Invoice;
