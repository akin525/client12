import React, {useState} from "react";

import axios from "axios";
import gh from 'lg.png'
import ReactPaginate from 'react-paginate';


export default function Purchase({color}) {
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id,setid] = useState("");
    const [datass, setdatass]=useState([])
    const [amount,setamount] = useState("");
    const baseURL2 = "https://server.savebills.com.ng/api/auth/purchase";
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10; // Number of items to display per page
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    let token=localStorage.getItem('dataKey');
    function myCallback(data) {

    }

    function contactCallback(data) {
    }
    React.useEffect(() => {

        setLoading(true);
        try {
            window.web2app.advert.showinterstitial(myCallback);

        }catch (e) {
            console.log("Can not excecute for now");
        }
        axios
            .get(baseURL2, {
                // username:useCookies('username'),
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                console.log(setMessage);
                setuserid(response.data.id);
                setdatass(response.data.bill);
                setLoading(false);

                console.log(response.data);

            });

    }, [token]);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    const filteredData = datass.filter(
        person => {
            if (datass.length ===0) return [];
            return (
                person
                    .username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .amount
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .createdAt
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||person
                    .refid
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }
    );

    const offset = currentPage * perPage;
    const currentPageData = filteredData.slice(offset, offset + perPage);


    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className="card card-body">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>
                    <div
                        className={
                            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                        }
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className={
                                            "font-semibold text-lg " +
                                            (color === "light" ? "text-blueGray-700" : "text-white")
                                        }
                                    >
                                        Purchase History
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}

                            {loading ? <div id={'anyme'} className="loader-container">
                                    <div className="spinner"/>
                                </div> :
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                    <tr>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Username
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Product
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Status
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Number
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Date
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        ></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        currentPageData.map((datab) => (
                                            <tr>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                    <img
                                                        src={gh}
                                                        className="h-12 w-12 bg-white rounded-full border"
                                                        alt="..."
                                                    ></img>{" "}
                                                    <span
                                                        className={
                                                            "ml-3 font-bold " +
                                                            +(color === "light" ? "text-blueGray-600" : "text-white")
                                                        }
                                                    >
                   {datab.username}
                  </span>
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.plan}
                                                </td>
                                                {datab.result == "0" ?
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-circle text-danger mr-2"></i> pending
                                                    </td> : true}
                                                {datab.result == "1" ?
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-circle text-success mr-2"></i> Delivered
                                                    </td> : true}
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.phone}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.createdAt}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>

                            }
                            {/* Add the pagination component */}
                            <div className="button-pagination">
                                {/* ... existing code ... */}

                                {/* Add the pagination buttons */}
                                <button
                                    className={currentPage === 0 ? 'disabled' : ''}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.ceil(filteredData.length / perPage) }).map(
                                    (_, index) => (
                                        <button
                                            key={index}
                                            className={currentPage === index ? 'active' : ''}
                                            onClick={() => setCurrentPage(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                                <button
                                    className={currentPage === Math.ceil(filteredData.length / perPage) - 1 ? 'disabled' : ''}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={currentPage === Math.ceil(filteredData.length / perPage) - 1}
                                >
                                    Next
                                </button>
                            </div>
                            <br/>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
