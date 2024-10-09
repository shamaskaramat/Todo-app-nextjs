import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoLogoFirebase } from "react-icons/io5";
import { RiNextjsLine } from "react-icons/ri";



const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-blue-100 py-2">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <span className="text-sm font-light">Assignment from TKTUNERS.</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm font-medium">Made with:</p>
                        <div className="flex items-center space-x-4">
                            <RiNextjsLine className="text-blue-300 h-8 w-8 hover:text-blue-100 transition-all duration-300 transform hover:scale-110" title="Next.js" />
                            <IoLogoFirebase className="text-yellow-300 h-8 w-8 hover:text-green-100 transition-all duration-300 transform hover:scale-110" title="Firebase" />
                        </div>
                    </div>

                    <div className="mt-6 md:mt-0">
                        <a
                            href="https://github.com/shamaskaramat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-200 hover:text-white transition-all duration-300 transform hover:scale-110 inline-block"
                        >
                            <FaGithub className="h-8 w-8" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;