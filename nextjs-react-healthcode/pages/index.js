import {useState} from "react";

export default function Home() {

    // define variables of the state
    const name = useState("");
    const gender = useState("");
    const yearOfBirth = useState("");
    const monthOfBirth = useState("");
    const dayOfBirth = useState("");
    const usingMacaoID = useState(false);
    const usingVisa = useState(false);
    const idNumber = useState("");
    const countryCode = useState("");
    const phoneNumber = useState("");
    const fever = useState(false);
    const cough = useState(false);
    const noneSymptom = useState(false);
    const contactWithConfirmedCase = useState(false);
    const nonContactWithConfirmedCase = useState(false);
    const checked = useState(0);
    const years = [];
    for (let i = new Date().getFullYear(); i >= 1910; i--) years.push(i);
    const months = [];
    for (let i = 1; i <= 12; i++) months.push(i);
    const days = [];
    for (let i = 1; i <= 31; i++) days.push(i);


    const setName = (value) => { name[1](value); }
    const setGender = (value) => { gender[1](value); }
    const setIdNumber = (value) => { idNumber[1](value); }
    const setPhoneNumber = (value) => { phoneNumber[1](value); }
    const setCountryCode = (value) => { countryCode[1](value); }

    const setUsingMacaoID = () => { usingMacaoID[1](true); usingVisa[1](false); }
    const setUsingVisa = () => { usingVisa[1](true); usingMacaoID[1](false); }

    const setFever = () => { fever[1](true); noneSymptom[1](false); }
    const setCough = () => { cough[1](true); noneSymptom[1](false); }
    const setNoneSymptom = () => { noneSymptom[1](true); fever[1](false); cough[1](false); }
    const setContactWithConfirmedCase = () => { contactWithConfirmedCase[1](true); nonContactWithConfirmedCase[1](false); }
    const setNonContactWithConfirmedCase = () => { nonContactWithConfirmedCase[1](true); contactWithConfirmedCase[1](false); }

    const clearAll = () => {
        name[1]("");
        gender[1]("");
        yearOfBirth[1]("");
        monthOfBirth[1]("");
        dayOfBirth[1]("");
        usingMacaoID[1](false);
        usingVisa[1](false);
        idNumber[1]("");
        countryCode[1]("");
        phoneNumber[1]("");
        fever[1](false);
        cough[1](false);
        noneSymptom[1](false);
        contactWithConfirmedCase[1](false);
        nonContactWithConfirmedCase[1](false);
        checked[1](0);
    }
    
    const checkSubmit = () => {
        let emptyField = [];
        checked[0] = 1;
        if (!(usingMacaoID[0] || usingVisa[0])) {
            document.getElementById("IdIndicator").style.color = "red";
            emptyField.push('?????????????????????????????????');
        } else {
            document.getElementById("IdIndicator").style.color = "black";
        }

        if (!(fever[0] || cough[0] || noneSymptom[0])) {
            document.getElementById("symptomIndicator").style.color = "red";
            emptyField.push('??????');
        } else {
            document.getElementById("symptomIndicator").style.color = "black";
        }
        if (!(contactWithConfirmedCase[0] || nonContactWithConfirmedCase[0])) {
            document.getElementById("contactIndicator").style.color = "red";
            emptyField.push('??????14????????????????????????????????????');
        } else {
            document.getElementById("contactIndicator").style.color = "black";
        }
        if (name[0] === '') {
            document.getElementById('inputName').style.border = '1px solid red';
            emptyField.push('??????')
        } else {
            document.getElementById('inputName').style.border = '1px solid darkgray';
        }
        if (gender[0] === '') {
            document.getElementById('inputGender').style.color = 'red';
            emptyField.push('??????')
        } else {
            document.getElementById('inputGender').style.color = 'black';
        }
        if (yearOfBirth[0] === '') {
            document.getElementById('birth').style.color = 'red';
            emptyField.push('????????????')
        } else {
            document.getElementById('birth').style.color = 'black';
        }
        if (monthOfBirth[0] === '') {
            document.getElementById('birth').style.color = 'red';
            emptyField.push('????????????')
        } else {
            document.getElementById('birth').style.color = 'black';
        }
        if (dayOfBirth[0] === '') {
            document.getElementById('birth').style.color = 'red';
            emptyField.push('????????????')
        } else {
            document.getElementById('birth').style.color = 'black';
        }
        if (countryCode[0] === '') {
            document.getElementById('phone').style.color = 'red';
            emptyField.push('????????????')
        } else {
            document.getElementById('phone').style.color = 'black';
        }
        if (phoneNumber[0] === '') {
            document.getElementById('phone').style.color = 'red';
            emptyField.push('????????????')
        } else {
            document.getElementById('phone').style.color = 'black';
        }
        if (idNumber[0] === '') {
            document.getElementById('IdIndicator').style.color = 'red';
            emptyField.push('?????????')
        } else {
            document.getElementById('IdIndicator').style.color = 'black';
        }
        if (emptyField.length > 0) {
            // alert('????????????????????????' + emptyField.join(', '))
            return false;
        }
        return true;

    }

    const submitInfo = () => {
        if (checkSubmit()) {
            alert(name[0] + '????????????');
        }
    }


    return (
        <div className="items-center px-4 py-6">
            <div className="min-w-full max-w-md px-3 py-3 justify-center bg-green-400 shadow-md">
                <div className="text-md text-gray-700">
                    ????????????
                </div>
            </div>
            <div className="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
                <div className="text-sm text-gray-700">
                    ????????????
                </div>
            </div>
            <div className="min-w-full max-w-md px-3 py-1 justify-center bg-white shadow-md">
                <div className="py-1">
                    <div className="text-sm my-2">
                        <span className="text-red-600 pr-1">*</span>
                        <span>?????????</span>
                    </div>
                    <input id="inputName" onChange={e => setName(e.target.value)} className="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700"></input>
                </div>

                <div className="py-1">
                    <div className="text-sm my-2">
                        <span className="text-red-600 pr-1">*</span>
                        <span id="inputGender">?????????</span>
                    </div>
                    <select name="gender"
                            className="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow"
                            defaultValue={"DEFAULT"}
                            onChange={e => setGender(e.target.value)}
                            id="inputGender"
                    >
                        <option value="DEFAULT" disabled>-- ????????? --</option>
                        <option value="M">???</option>
                        <option value="F">???</option>
                    </select>
                </div>

                <div className="py-1">
                    <div className="text-sm my-2">
                        <span className="text-red-600 pr-1">*</span>
                        <span id="birth">???????????????(??? ??? ???)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">

                        <select name="year"
                                className="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow"
                                defaultValue={"DEFAULT"}
                                onChange={e => yearOfBirth[1](e.target.value)}
                        >
                            <option value="DEFAULT" disabled>-- ??? --</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>


                        <select name="month"
                                className="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow"
                                defaultValue={"DEFAULT"}
                                onChange={e => monthOfBirth[1](e.target.value)}
                                id="inputMonthOfBirth"
                        >
                            <option value="DEFAULT" disabled>-- ??? --</option>
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>

                        <select name="day"
                                className="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow"
                                defaultValue={"DEFAULT"}
                                onChange={e => dayOfBirth[1](e.target.value)}
                                id="inputDayOfBirth"
                        >
                            <option value="DEFAULT" disabled>-- ??? --</option>
                            {days.map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className="py-1">

                    <div id="IdIndicator" className="text-sm my-2">
                        <span className="text-red-600 pr-1">*</span>
                        <span>???????????????????????????????????????</span>
                    </div>
                    <div className="text-sm text-gray-700 grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <input onChange={setUsingMacaoID} checked={usingMacaoID[0]} type="checkbox"></input>
                                <span className="px-1">?????????????????????</span>
                        </div>
                        <div className="col-span-1">
                            <input onChange={setUsingVisa} checked={usingVisa[0]} type="checkbox"></input>
                                <span className="px-1">??????????????????</span>
                        </div>
                    </div>
                    { (usingMacaoID[0] === true || usingVisa[0] === true) && 
                        <input onChange={e => {setIdNumber(e.target.value)}} className="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700"></input> }
                </div>

                <div className="py-1">
                    <div id="phoneIndicator" className="text-sm my-2">
                        <span className="text-red-600 pr-1">*</span>
                        <span id="phone">???????????????</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <select name="regionCode"
                                className="col-span-1 w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 shadow"
                                defaultValue={"DEFAULT"}
                                onChange={e => setCountryCode(e.target.value)}
                        >
                            <option value="DEFAULT" disabled>- ?????? -</option>
                            <option value="853">853</option>
                            <option value="852">852</option>
                            <option value="86">86</option>
                        </select>
                        <input onChange={e => setPhoneNumber(e.target.value)} className="col-span-3 w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700"></input>
                    </div>
                </div>
            </div>
            <div className="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
                <div id="symptomIndicator" className="text-sm text-gray-700">
                    ??????????????????????????????????
                </div>
            </div>

            <div className="min-w-full max-w-md px-3 py-3 justify-center bg-white shadow-md">
                <div className="py-1">
                    <input onChange={setFever} checked={fever[0]} type="checkbox"></input>
                        <span className="px-1 text-sm text-gray-700">??????</span>
                </div>
                <div className="py-1">
                    <input onChange={setCough} checked={cough[0]} type="checkbox"></input>
                        <span className="px-1 text-sm text-gray-700">??????????????????????????????(???)??????????????????????????????????????????</span>
                </div>
                <div className="py-1">
                    <input onChange={setNoneSymptom} checked={noneSymptom[0]} type="checkbox"></input>
                        <span className="px-1 text-sm text-gray-700">??????????????????</span>
                </div>
            </div>

            <div className="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
                <div id="contactIndicator" className="text-sm text-gray-700">
                    ????????????14???????????????????????????????????????????????????????????????????
                </div>
            </div>
            <div className="min-w-full max-w-md px-3 py-3 justify-center bg-white shadow-md">
                <div className="py-1">
                    <input onChange={setContactWithConfirmedCase} checked={contactWithConfirmedCase[0]} type="checkbox"></input>
                        <span className="px-1 text-sm text-gray-700">???</span>
                </div>
                <div className="py-1">
                    <input onChange={setNonContactWithConfirmedCase} checked={nonContactWithConfirmedCase[0]} type="checkbox"></input>
                        <span className="px-1 text-sm text-gray-700">???</span>
                </div>
            </div>
            <div className="min-w-full max-w-md px-3 py-1 justify-center bg-white shadow-md">
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={clearAll} className="col-span-1 my-2 py-2 border rounded">??????</button>
                    <button onClick={submitInfo} className="col-span-1 my-2 py-2 border rounded bg-blue-400 text-white">?????????</button>
                </div>
            </div>
        </div>
    )
}