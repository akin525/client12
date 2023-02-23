

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";
import gh from "../../lg.png";
import ig from "../../ba.png";

export default function Vtu() {
    const [network, setnetwork] = useState("");
    const [con, setcon] = useState("");
    const [amount, setamount] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [userid, setuserid] = useState("");
    const [number,setnumber] = useState("");
    const [refid,setrefid] = useState("");
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    const [loading, setloading]=useState(false);
    const baseURL = "https://server.savebills.com.ng/api/auth/airtime";
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
                    amount:amount,
                    refid:refid,
                    number:number,
                    network:network,
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
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/airtime";
                    });


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

    return (
        <>
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>OWN VTU WEBSITE</h2>
                        </div>
                    </div>
                </div>
                <div className="card-body bg-white rounded text-left">
                    <span style="font-size: 20px"><b>Do you know?</b></span> You can own a professional VTU website
                    like <a href="https://easyaccess.com.ng">https://easyaccess.com.ng</a> to resell all our products
                    ranging from <b>DATA, AIRTIME, EDUCATIONAL PINS (WAEC, NECO, NABTEB), CABLE TV SUBSCRIPTION AND
                    ELECTRICITY BILL PAYMENTS at your own prices?</b> Yes, you can set your own prices on your website
                    and your customers will buy at your set prices!

                    <br></br>
                        Lets see more details below:
                        <br></br><span><b>BENEFITS:</b></span>
                            <ol>
                                <li>You become your own boss!</li>
                                <li>You make huge profits daily, weekly, monthly, and forever! - You can earn up to
                                    N100,000 weekly and more.
                                </li>
                                <li>You own a website carrying your own unique name, website link, logo, etc. - Meaning
                                    you get your own <b>BRAND.</b></li>
                                <li>You will get a flexible Admin Panel (backend) that only you (the owner) has access
                                    to and it allows you to view all your users, fund and deduct their wallets, edit and
                                    set your own prices for all products, activate and deactivate any data of your
                                    choice, view all payments and purchases and lots more.
                                </li>
                                <li>You own a platform that can accommodate hundreds and thousands of users/resellers
                                    buying from you. So you have no limitation.
                                </li>
                                <li>You become a name/voice in the telecomunication market.</li>
                                <li>You have the capacity of expanding to any level the business takes you to.</li>
                                <li>You stand a chance to partake in more great offers from us from time to time. These
                                    include; reduction in data prices and other products.
                                </li>
                                <li>And More...</li>
                            </ol>
                            <br></br><span><b>AVAILIBILITY:</b></span>
                                <ol>
                                    <li>Website will be ready between <b>5days-2weeks</b> from date of strike of deal
                                        (Depending on workload and other circumstances).
                                    </li>
                                </ol>
                                <br></br><span><b>REQUIREMENT/THINGS TO SUPPLY(For the Website Creation):</b></span>
                                    <ol>
                                        <li>Full Name</li>
                                        <li>Website Name e.g. Renomobilemoney</li>
                                        <li>Website Address e.g renomobilemoney.com.ng</li>
                                        <li>Website Contact Phone Number</li>
                                        <li>Business Logo</li>
                                        <li>Website Contact address</li>
                                        <li>Account Details; your bank account details that your users will pay money
                                            into for manual funding.
                                        </li>
                                        <li>Login to your <a
                                            href="https://renomobilemoney.com">https://renomobilemoney.com.ng</a> Account,
                                            on the sidebar, click on API Documentation, copy your Authorization Token
                                            (long alphabets/digits shown) and send to us. Note: this must not be seen by
                                            anyone else.
                                        </li>
                                        <li>Create an Account with <a
                                            href="https://paystack.com">https://paystack.com</a></li>
                                        <li>You will also be required to Create an Account with <a
                                            href="https://monnigy.com">https://monnify.com</a> For Auto-Wallet Funding
                                            but this will be needed when the website is live. So you can ignore this for
                                            now.
                                        </li>
                                    </ol>
                                    <br></br><span><b>SAMPLE WEBSITE:</b></span>
                                        <ol>
                                            <li>Website will look like <a target="_blank"
                                                                          href="https://yellowmantelecoms.com.ng/">https://yellowmantelecoms.com.ng</a> (this
                                                is one of our affiliate websites). That is the design we use for our
                                                Affiliate/Partner Websites and it is written with the latest technology
                                                (Laravel). You can check it out.
                                            </li>
                                            <br></br>
                                        </ol>
                                        <br></br><span><b>ADDITIONAL FEATURES (Note that our Affiliate Websites also have):</b></span>
                                            <ol>
                                                <li>Self-Service for verification of Data/Airtime purchases by users.
                                                </li>
                                                <li>Self-Service for Resolution of Successful but Uncredited Payments
                                                    made through ATM Cards (Paystack) by users and get automatically
                                                    credited/funded by the robot.
                                                </li>
                                                <li>Self-Service for Resolution of Successful but Uncredited Payments
                                                    made through Bank Transfers (Monnify) by users and get automatically
                                                    credited/funded by the robot.
                                                </li>
                                                <li>Three Fundiing Methods - Paystack, Auto-Wallet Funding (Monnify) and
                                                    Manual Funding to Specified Bank Account by Owner.
                                                </li>
                                                <li>Flexible purchase pages for <b>all products (Data, Airtime, TV
                                                    Subscription, Electricity Bills and Educational Pins (WAEC, NECO,
                                                    NABTEB))</b> and instant delivery.
                                                </li>
                                                <li>Instant Automatic Refunds for Failed/Undelivered Transactions.</li>
                                                <li>A flexible Admin Panel (backend) that only you (the owner) has
                                                    access to and it allows you to view all your users, fund and deduct
                                                    their wallets, edit and set your own prices for all products,
                                                    activate and deactivate any data of your choice, view all payments
                                                    and purchases and lots more.
                                                </li>
                                                <li>Referral System.</li>
                                                <li>Application Programming Interface (API) (with further
                                                    negotiations)
                                                </li>
                                                <li>100% Security.</li>
                                                <li>24/7 Customer Support (For Inquires and others).</li>
                                                <li>And More...</li>
                                            </ol>
                                            <br></br><span><b>PRODUCTS COST PRICES (How much you will be buying products):</b></span>
                                                <ol>
                                                    <li>Click on the link below to see our current prices for API users
                                                        (Website Owners).
                                                        <br></br>
                                                            <a target="_blank"
                                                               href="https://renomobilemoney.com/#testimonials">https://renomobilemoney.com/#pricing</a>.
                                                            This will be your supply prices (the prices you are buying).
                                                            You can then add your own prices on your website Admin Panel
                                                            (Backend).</li>
                                                </ol>
                                                <br></br><span><b>PRIVACY/CONDITIONS:</b></span>
                                                    <ol>
                                                        <li>All information/data supplied to us are highly encrypted and
                                                            are not shared with any third party (This is also required
                                                            on your end).
                                                        </li>
                                                        <li>You will be connected to our Website/API. (Thats why it is
                                                            called a reseller or affiliate or partner website). If there
                                                            is any need to add another company/API, further negotiations
                                                            will be required.
                                                        </li>
                                                        <li>Cpanel or hosting login details will remain with us for
                                                            security reasons. You have no worries as we are 100%
                                                            trustworthy and reliable.
                                                        </li>
                                                    </ol>
                                                    <br></br><span><b>WEBSITE COST/PRICE (PROMO):</b></span>
                                                        <ol>
                                                            <li><b>N50,000</b> only (Including Domain Name, Hosting Fee
                                                                and Security (SSL)). Only 70%
                                                                payment <b>(N35,000)</b> is required as first
                                                                installment and balance of 30% <b>(N15,000)</b> paid
                                                                after completion.
                                                            </li>
                                                        </ol>
                                                        <br></br>
                                                            Ready to make a move? <a target="_blank"
                                                                                     href="https://wa.me/2348066215840"
                                                                                     style="text-decoration:none;">
                                                            <button className="btn btn-success">Message Us</button>
                                                        </a>
                                                            <table className="table table-responsive text-left">

                                                            </table>
                </div>
            </div>

            </>
    );
}
