"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link'
import React, { useState } from 'react'

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <nav className='flex justify-center gap-5 bg-slate-800 py-2 mb-3'>
            <Link href='/'>
                <p>Home</p>
            </Link>

            <div className="relative cursor-pointer">
                <div onClick={toggleDropdown} className='flex flex-row items-center'>
                    <p>Forms</p>
                    <div className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                       <ChevronUp />
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                        <Link href='/recipes/create'>
                            <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create recipe</p>
                        </Link>
                        <Link href='/ingredients/create'>
                            <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create ingredient</p>
                        </Link>
                        <Link href='/tools/create'>
                            <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create tool</p>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Topbar