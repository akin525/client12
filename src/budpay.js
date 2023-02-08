let BudPayCheckout = (configData) => {
    // Create SVG Loader Function
    let openSVGLoaderFuncBudPay = () => {
        let svgLoaderDiv = document.createElement("div");
        svgLoaderDiv.setAttribute("id", "budpay-svg-loader-container");
        svgLoaderDiv.setAttribute("style", "position:fixed;top:0;left:0;z-index:99999999999999;border:none;pointer-events:none;width:100%;height:100%;background:rgba(0,0,0,0.65);display:flex;justify-content:center;align-items:center;");
        svgLoaderDiv.innerHTML = `
            <svg version="1.1" id="L9" width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.7s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                </path>
            </svg>
        `;
        return svgLoaderDiv;
    }


    // Remove SVG Loader Function
    let removeSVGLoaderFuncBudPay = () => {
        if (document.body.contains(document.getElementById('budpay-svg-loader-container'))) {
            document.getElementById('budpay-svg-loader-container').remove();
        }
    }


    // Create Payment Modal iFrame Function
    let openPaymentModalIFrame = () => {
        let iframeDiv = document.createElement("iframe");
        iframeDiv.setAttribute("id", "budpay-iframe-container");
        iframeDiv.setAttribute("style", "position:fixed;top:0;left:0;z-index:99999999999999;border:none;opacity:0;pointer-events:none;width:100%;height:100%;");
        iframeDiv.setAttribute("allowTransparency", "true");
        iframeDiv.setAttribute("width", "100%");
        iframeDiv.setAttribute("height", "100%");
        iframeDiv.setAttribute("allow", "clipboard-read; clipboard-write");
        iframeDiv.setAttribute('src', 'https://inlinepay.budpay.com');
        // iframeDiv.setAttribute('src', 'http://127.0.0.1:5500');
        return iframeDiv;
    }

    // Validate Amount Function
    function verifyAmountData(value) {
        return (value !== '') && (value !== NaN) && (value !== 'undefined') && (value !== null) ? value : false;
    }

    // Email Regex Function
    function validateEmailAddress(value) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.match(emailRegex) ? true : false;
    }

    // Validate Email Function
    function verifyEmailData(value) {
        return (value !== '') && (value !== NaN) && (value !== 'undefined') && (value !== null) && (validateEmailAddress(value)) ? value : false;
    }


    // Check Data Input Validity
    let iFrameValidateAndReturnDataInput = () => {
        if (configData !== null) {

            // Validate Key
            configData.hasOwnProperty('key') ? '' : console.log('Please enter private key into config');

            // Validate Amount
            if (configData.hasOwnProperty('amount')) {
                verifyAmountData(configData.amount) ? '' : console.log('Please enter correct amount');
            } else {
                console.log('Please enter amount key into config');
            }

            // Validate Email
            if (configData.hasOwnProperty('email')) {
                verifyEmailData(configData.email) ? '' : console.log('Please enter valid email')
            } else {
                console.log('Please enter email key into config');
            }

            if ((configData.hasOwnProperty('key')) && (verifyEmailData(configData.email)) && (verifyAmountData(configData.amount))) {
                return {
                    status: true,
                    type: 'initializeTransaction',
                    key: configData.key || null,
                    email: verifyEmailData(configData.email) || null,
                    amount: verifyAmountData(configData.amount) || null,
                    currency: configData.currency || null,
                    first_name: configData.first_name || null,
                    last_name: configData.last_name || null,
                    phone: configData.phone || null,
                    logo_url: configData.logo_url || null,
                    callback_url: configData.callback_url || null,
                    reference: configData.reference || '' + Math.floor((Math.random() * 1000000000) + 1) + new Date().getSeconds() + new Date().getMilliseconds()
                }
            } else {
                console.log('Check that you entered correct data in the config');
                return { status: false }
            }
        } else {
            console.log('Set required field (Amount, Key, Email) data in the config');
            return { status: false }
        }
    }

    // Close Payment
    let closeTransaction = (data) => {
        document.querySelector('iframe#budpay-iframe-container').remove();

        if(configData.hasOwnProperty('callback_url') && configData.callback_url && configData.callback_url !== null && configData.callback_url !== 'null') {
            // Redirect to callback_url
            configData.callback_url += (configData.callback_url.indexOf('?') > -1 ? '&' : '?') + 'reference=' + data.reference + '&status=' + data.status;
            window.location.href = configData.callback_url;
        } else {
            if(data.callback_url && data.callback_url !== null && data.callback_url !== 'null') {
                window.location.href = data.callback_url;
            } else {
                configData.hasOwnProperty('callback') && configData.callback(data);
            }
        }
    }

    // Cancel Payment
    let cancelPayment = (data) => {
        document.querySelector('iframe#budpay-iframe-container').remove();
        configData.onClose();
    }

    // Send postMessage to iFrame
    let sendPostMessageFunc = (selector, data) => {
        selector.contentWindow.postMessage(data, "*");
    }

    // Receive Data from Parent
    window.addEventListener('message', function (event) {
        if (!event.data) { return; }

        function safeJsonParse(str) {
            try {
                return [null, JSON.parse(str)];
            } catch (err) {
                return [err];
            }
        }

        const [err, result] = safeJsonParse(event.data);
        if (!err) {
            if (result.type === 'cancelPayment') {
                cancelPayment(result);
            }
            if (result.type === 'closeTransaction') {
                closeTransaction(result);
            }
        }

    });


    // Validate User Input and Send to iFrame
    if (iFrameValidateAndReturnDataInput().status) {
        document.body.appendChild(openSVGLoaderFuncBudPay()); // Append SVG Loader
        document.body.appendChild(openPaymentModalIFrame()); // Append Iframe

        document.querySelector('iframe#budpay-iframe-container').onload = () => {
            removeSVGLoaderFuncBudPay(); // Remove SVG Loader

            let iframeSelector = document.querySelector('iframe#budpay-iframe-container');
            iframeSelector.style.opacity = "1";
            iframeSelector.style.pointerEvents = "auto";

            // Send User Input to Iframe
            sendPostMessageFunc(iframeSelector, iFrameValidateAndReturnDataInput());
        }
    } else {
        console.log('Error. Check Again')
    }
}