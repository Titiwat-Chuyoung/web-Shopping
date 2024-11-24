import React, { useState, useRef, useEffect } from "react";

const RegisterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <button onClick={openPopup} className="bg-blue-500 text-white px-4 py-2 rounded">
                Register
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div ref={popupRef} className="bg-white flex flex-row justify-between items-center h-[740px] w-[1100px] rounded-3xl">
                        {/* Left side */}
                        <div className="flex flex-col bg-zinc-300 w-1/2 h-full rounded-l-3xl">
                            <div className="flex items-center h-1/6 px-12">
                                <h1 className="text-[30px] text-black opacity-50">Welcome!</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center h-4/6">
                                <img src="/images/image.png" alt="logo" className="w-[130px]" />
                                <span className="text-[30px] font-semibold">SANNONGVAN</span>
                            </div>
                            <div className="flex items-center h-1/5 px-12">
                                <p className="text-[17px] text-gray-600">Not a member yet? 
                                    <span className="font-medium text-black cursor-pointer" onClick={closePopup}> Log in now</span>
                                </p>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex flex-col w-1/2 h-full p-10 space-y-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-[30px] font-semibold">Register with your e-mail</h1>
                            </div>
                            <form className="space-y-6">
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="username" className="text-sm font-normal">USERNAME <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        className="p-2 border-b-[1px] focus:outline-none text-gray-600 text-sm" 
                                        placeholder="Username" 
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="email" className="text-sm font-normal">EMAIL <span className="text-red-500">*</span></label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="p-2 border-b-[1px] focus:outline-none text-gray-600 text-sm" 
                                        placeholder="e-mail" 
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="flex flex-col space-y-2 w-1/2">
                                        <label htmlFor="password" className="text-sm font-normal">PASSWORD <span className="text-red-500">*</span></label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            className="p-2 border-b-[1px] focus:outline-none text-gray-600 text-sm" 
                                            placeholder="Password" 
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2 w-1/2">
                                        <label htmlFor="repeat-password" className="text-sm font-normal">REPEAT PASSWORD <span className="text-red-500">*</span></label>
                                        <input 
                                            type="password" 
                                            id="repeat-password" 
                                            className="p-2 border-b-[1px] focus:outline-none text-gray-600 text-sm" 
                                            placeholder="Repeat Password" 
                                        />
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600">
                                    Sannongvan may keep me informed with personalized emails about products and services. See our <span className="font-medium text-black cursor-pointer">Privacy Policy</span> for more details.
                                </p>

                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="contact-me" />
                                        <label htmlFor="contact-me" className="text-sm">Please contact me via e-mail</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="accept-terms" />
                                        <label htmlFor="accept-terms" className="text-sm">I have read and accept the Terms and Conditions</label>
                                    </div>
                                </div>

                                <button type="submit" className="bg-black text-white py-4 px-4 rounded w-full text-[16px] font-semibold">Create Account</button>

                                <div className="flex flex-col space-y-5 mt-3">
                                    <p className="text-sm text-gray-600 text-left">Or register with</p>
                                    <div className="flex justify-center space-x-7">
                                    <button className="bg-white border-black border-[2px] text-gray-600 px-5 py-3 rounded-md shadow-sm flex items-center space-x-2 hover:bg-gray-50">
                                        <img src="/images/Google.png" alt="Google" className="w-6 h-6 mr-2" />
                                        <span className="text-sm">Google</span>
                                    </button>
                                    <button className="bg-white border-black border-[2px] text-gray-600 px-5 py-3 rounded-md shadow-sm flex items-center space-x-2 hover:bg-gray-50">
                                        <img src="/images/icons8-apple-logo-24 (3).png" alt="Apple ID" className="w-6 h-6 mr-2" />
                                        <span className="text-sm">Apple ID</span>
                                    </button>
                                    <button className="bg-white border-black border-[2px] text-gray-600 px-3 py-3 rounded-md shadow-sm flex items-center space-x-2 hover:bg-gray-50">
                                        <img src="/images/Facebook F.png" alt="Facebook" className="w-6 h-6 mr-2" />
                                        <span className="text-sm">Facebook</span>
                                    </button>
                                </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

