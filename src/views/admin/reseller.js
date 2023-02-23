

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";
import gh from "../../lg.png";
import ig from "../../ba.png";

export default function Reseller() {
    const [network, setnetwork] = useState("");
    const [con, setcon] = useState("");
    const [amount, setamount] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [userid, setuserid] = useState("");
    const [number,setnumber] = useState("");
    const [refid,setrefid] = useState("");
    const [apikey, setapikey] = useState("");
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    const [loading, setloading]=useState(false);
    const baseURL = "https://server.savebills.com.ng/api/auth/upgrade";
    let token=localStorage.getItem('dataKey');

    function myCallback(data) {
        setcon(JSON.stringify(data.success));
    }

    function contactCallback(data) {
        console.log("I am in callback")
        console.log(JSON.stringify(data));
        alert(JSON.stringify(data));
        document.getElementById('number').value=data.data;
        setnumber(data.data);
    }
function pick(){
    window.web2app.showinterstitial(contactCallback);
}
console.log()
    React.useEffect(() => {
        try {//
            window.web2app.deviceInfo(myCallback);
        }catch (e) {
            console.log("Can not excecute for now");
        }
        setrefid("airtime"+Math.floor((Math.random() * 1000000000) + 1));
        axios
            .get(baseURL1, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                setuserid(response.data.id);
                setapikey(response.data.apikey);
                if (response.data.status ==="0"){
                    window.location='login';
                }
                console.log(response.data);

            });

    }, []);

    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })
    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "network"){
            setnetwork(value);
        }
        if(id === "amount"){
            setamount(value);
        }
        if(id === "number"){
            setnumber(value);
        }





    }


    const handleSubmit  = async () =>  {
        // console.log(name,username,email,number,password,confirmPassword);

        setloading(true);

        try {
            axios
                .post(baseURL, {
                    userId:userid,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setError("");
                setMessage(response);
                setloading(false);
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    })


                }else{
                    setMessage(response.data.message);
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/dashboard";
                    });
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }
    const frame={
        border: "1px solid #ddd",
    borderRadius: "3px",
    overflow: "auto",
    marginBottom: "1em",
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Api Access</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >Reseller
                                </button>
                            </div>
                        </div>

                        <div className={'card card-body'}>

                            <h4><b>Check User Detail</b></h4>
                            <div className={frame}>
                            <pre className={'language-javascript'}>
                                <code>
                                    <p>$curl = curl_init();</p>

    <p>curl_setopt_array($curl, array(</p>
    <p>CURLOPT_URL => 'http://localhost:8081/api/auth/me',</p>
    <p> CURLOPT_RETURNTRANSFER => true,</p>
    <p>CURLOPT_ENCODING => '',</p>
    <p>CURLOPT_MAXREDIRS => 10,</p>
    <p>CURLOPT_TIMEOUT => 0,</p>
    <p>CURLOPT_FOLLOWLOCATION => true,</p>
    <p>CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,</p>
    <p>CURLOPT_CUSTOMREQUEST => 'POST',</p>
    <p>CURLOPT_HTTPHEADER => array(</p>
    <p>'Content-Type: application/json'</p>
                                    <p>'Authorization': 'hij3dui0678iujk23hegwtfyu23dwky'</p>
    <p>),</p>
    <p>));</p>

$response = curl_exec($curl);

curl_close($curl);
echo $response;

                                </code>
                            </pre>
                            </div>
                        <p>Before you access our API, Kindly note the conditions below:</p>
                        <ul className="w3-ul w3-card" >
                            <li>1. You have successfully requested for Api Key ({apikey})</li>
                            <li>2. You can access our api documentation via <a
                                href="#"
                                target="_blank"><b>savebills.com.ng/API/docs/index</b></a></li>
                            <li>3. API service is available for DATA, AIRTIME VTU and BILLS PAYMENT(Dstv, Gotv,
                                Startimes, Smile Bundle, Smile Recharge, Spectranet, Waec Result Checker)
                            </li>
                            <li>4. You can generate a new API key free of charge, note that the formal key will no
                                longer be functional once you generate a new key
                            </li>
                            <li>5. Do not disclose your API key to anyone, Primedata staffs will never request for it
                            </li>
                            <li>6. Updates about API service will be sent via mail
                                to <b>.........</b></li>
                            <li>7. For any issue about this API service kindly mail our technical department
                                via <b>info@renomobilemoney.com</b></li>
                        </ul>
                        <br></br>
                    </div>
                    </div>

                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <img src={ig} />
                            </div>
                                <div className="text-center mt-12">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-success">Never Release your api-key to anyone in term of security level<span
                                            id="RightT"> </span></li>


                                        {loading ? <div className="loader-container">
                                                <div className="spinner"/>
                                            </div> :
                                            <form>

                                                <div className="flex flex-wrap">

                                                    <div className="w-full ">
                                                        <div className="relative w-full mb-3">
                                                            <label
                                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                htmlFor="grid-password"
                                                            >
                                                                Apikey
                                                            </label>
                                                          <h3><b>{apikey}</b></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={handleSubmit}
                                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                                    Reset Key
                                                </button>
                                                <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                            </form>
                                        }
                                    </ul>

                                    <br></br>
                                    <br></br>


                                </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
